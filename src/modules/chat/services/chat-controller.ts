import { getChannelsApi, getMessagesApi, sendMessageApi } from '@/api/chat'
import network from '@/modules/chat/services/network'
import { UserType } from '@/types'
import {
  ChannelType,
  ChatChangeStatusType,
  ChatMessageReceiver,
  ChatMessageReceiverEnum,
  ChatMessageType,
  ChatReactionType,
  ReadyMessageType,
  UserChatStatusType,
} from '@/types/chat'
import { uploadFile } from '@/utils/file'
import { getUserLocal } from '@/utils/helper'
import { EqualBigInt } from '@/utils/number'

const DEFAULT_LIMIT = 50

export enum MessageEventEnum {
  LOAD_PREFIX,
  LOAD_SUFFIX,
  NEW_MESSAGES,
  REACTION_ADDED,
}

export interface NewMessageListener {
  onNewMessages: (channelId: bigint, messages: ChatMessageType[]) => void
}

export interface ChannelsListener {
  onChannelsChanged: (handle: string, newChannels: ChannelType[]) => void
}

export interface MessagesListener {
  onMessages: (channelId: bigint, messages: ChatMessageType[], eventType: MessageEventEnum) => void
}

export interface ChatStatusListener {
  onStatusChanged: (communityHandle: string, onlineUsers: Map<string, UserType>) => void
}

class ChatController {
  private networkListener = {
    onConnected: () => {},

    onDisconnected: async () => {},

    onMessage: (s: ChatMessageReceiver) => {
      let myUser: UserType | undefined
      switch (s.o) {
        case ChatMessageReceiverEnum.MESSAGE_CREATED:
          const chatMessage = s.d as ChatMessageType

          this.updateAndBroadcastMessages(
            chatMessage.channel_id,
            [chatMessage],
            MessageEventEnum.NEW_MESSAGES
          )

          break
        case ChatMessageReceiverEnum.REACTION_ADDED:
          const reaction = s.d as ChatReactionType

          this.updateAndBroadcastEmoji(
            reaction.channel_id,
            reaction,
            MessageEventEnum.REACTION_ADDED
          )
          break
        case ChatMessageReceiverEnum.READY:
          const readyMessage = s.d as ReadyMessageType
          myUser = getUserLocal()
          if (!myUser) {
            return
          }

          readyMessage.communities.forEach((community) => {
            const onlineUsers = new Map<string, UserType>()
            if (community.chat_members) {
              community.chat_members.forEach((chatMember) => {
                if (
                  chatMember.status === UserChatStatusType.ONLINE &&
                  chatMember.id !== myUser?.id
                ) {
                  onlineUsers.set(chatMember.id, chatMember)
                }
              })

              this.userStatuses.set(community.handle, onlineUsers)
              this.broadcastStatusChanges(community.handle, onlineUsers)
            }
          })
          break
        case ChatMessageReceiverEnum.CHANGE_STATUS:
          myUser = getUserLocal()
          if (!myUser) {
            return
          }
          const message = s.d as ChatChangeStatusType

          // Remove user from online status from all communities
          this.userStatuses.forEach(
            (onlineUsers: Map<string, UserType>, communityHandle: string) => {
              if (onlineUsers.has(message.user.id)) {
                if (message.user.status === UserChatStatusType.OFFLINE) {
                  onlineUsers.delete(message.user.id)
                  this.broadcastStatusChanges(communityHandle, onlineUsers)
                }
              } else if (
                message.user.status === UserChatStatusType.ONLINE &&
                message.user.id !== myUser?.id
              ) {
                onlineUsers.set(message.user.id, message.user)
                this.broadcastStatusChanges(communityHandle, onlineUsers)
              }
            }
          )
          break
      }
    },
  }

  // Channels
  private channelListeners = new Set<ChannelsListener>()
  private channelsCache = new Map<string, ChannelType[]>()

  // Messages
  private messagesListener = new Set<MessagesListener>()
  private newMessageListeners = new Set<NewMessageListener>()

  // User chat statuses
  private chatStatusListener = new Set<ChatStatusListener>()

  /**
   * This is local messages used by the UI components. In most case, it's identical to the list of
   * server messgaes. However, it might contains some pending messages only on the clientn (i.e. an
   * image that's still uploading or sent message that is not confirmed by server).
   */
  private localMessages = new Map<string, ChatMessageType[]>()

  // Match between channelid -> last scroll position of that channel
  private lastScrollPosition = new Map<string, number>()

  // Indicates if we still has more prefix messages to load for a channel
  private noMorePrefix = new Map<string, boolean>()

  // A flag to avoid caller to call loading prefix messages multiple times.
  private isLoadingPrefix = new Map<string, boolean>()

  private userStatuses = new Map<string, Map<string, UserType>>()

  // Constructor
  constructor() {
    network.addListener(this.networkListener)
  }

  /// Add and remove listeners
  addChannelsListener(listener: ChannelsListener) {
    this.channelListeners.add(listener)
  }

  removeChannelsListener(listener: ChannelsListener) {
    this.channelListeners.delete(listener)
  }

  addMessagesListener(listener: MessagesListener) {
    this.messagesListener.add(listener)
  }

  removeMessagesListener(listener: MessagesListener) {
    this.messagesListener.delete(listener)
  }

  addNewMessageListener(listener: NewMessageListener) {
    this.newMessageListeners.add(listener)
  }

  removeNewMessageListener(listener: NewMessageListener) {
    this.newMessageListeners.delete(listener)
  }

  addChatStatusListener(listener: ChatStatusListener) {
    this.chatStatusListener.add(listener)
  }

  removeChatStatusListener(listener: ChatStatusListener) {
    this.chatStatusListener.delete(listener)
  }

  ///////// End of Listeners

  connect() {
    network.connect()
  }

  /**
   * Loads channels for a community handle.
   */
  async loadChannels(handle: string) {
    const res = await getChannelsApi(handle)
    if (res.code === 0 && res.data) {
      const channels = res.data.channels

      this.channelsCache.set(handle, channels)
      this.channelListeners.forEach((listener) => listener.onChannelsChanged(handle, channels))
    }
  }

  /**
   * @returns the list of channels in the cache for a community.
   */
  getChannels(handle: string): ChannelType[] {
    return this.channelsCache.get(handle) || []
  }

  getChannel(communityHandle: string, channelId: bigint): ChannelType | undefined {
    const channels = this.getChannels(communityHandle)
    for (let i = 0; i < channels.length; i++) {
      if (EqualBigInt(channels[i].id, channelId)) {
        return channels[i]
      }
    }

    return undefined
  }

  async loadMessages(channelId: bigint, lastMessageId: bigint, eventType: MessageEventEnum) {
    if (channelId === BigInt(0)) {
      return
    }

    const channelIdString = channelId.toString()
    if (this.isLoadingPrefix.get(channelIdString)) {
      // This is being loaded
      return
    }

    if (this.noMorePrefix.get(channelIdString)) {
      // We have loaded all the prefix messages.
      return
    }

    this.isLoadingPrefix.set(channelIdString, true)

    const res = await getMessagesApi(channelId, lastMessageId, DEFAULT_LIMIT)
    if (res.code === 0 && res.data) {
      if (res.data.messages.length < DEFAULT_LIMIT) {
        this.noMorePrefix.set(channelIdString, true)
      }

      const messages = [...res.data.messages].reverse()
      this.updateAndBroadcastMessages(channelId, messages, eventType)
    }

    setTimeout(() => {
      // Add some delay to avoid calling this multiple times.
      this.isLoadingPrefix.set(channelIdString, false)
    }, 200)
  }

  /**
   * Reconciles the local message list and the list returned from server.
   * @returns
   */
  private reconcileMessages(
    messages: ChatMessageType[],
    serverMessages: ChatMessageType[]
  ): ChatMessageType[] {
    let result: ChatMessageType[] = []
    const usedIds = new Set<string>()
    let i = 0
    let j = 0
    for (; i < messages.length && j < serverMessages.length; ) {
      if (usedIds.has(messages[i].id.toString())) {
        i++
        continue
      }
      if (usedIds.has(serverMessages[j].id.toString())) {
        j++
        continue
      }

      if (messages[i].id === serverMessages[j].id) {
        result.push(serverMessages[j])
        usedIds.add(serverMessages[j].id.toString())
        i++
        j++
      } else if (messages[i].id < serverMessages[j].id) {
        result.push(messages[i])
        usedIds.add(messages[i].id.toString())
        i++
      } else {
        result.push(serverMessages[j])
        usedIds.add(serverMessages[j].id.toString())
        j++
      }
    }

    // Add the rest of the messages to the result.
    for (; i < messages.length; i++) {
      if (usedIds.has(messages[i].id.toString())) {
        i++
        continue
      }

      result.push(messages[i])
      usedIds.add(messages[i].id.toString())
    }

    for (; j < serverMessages.length; j++) {
      if (usedIds.has(serverMessages[j].id.toString())) {
        j++
        continue
      }

      result.push(serverMessages[j])
    }

    return result
  }

  private updateAndBroadcastMessages(
    channelId: bigint,
    serverMessages: ChatMessageType[],
    eventType: MessageEventEnum
  ) {
    const channelIdString = channelId.toString()
    let messages = this.localMessages.get(channelIdString)
    if (!messages) {
      this.localMessages.set(channelIdString, serverMessages)
    } else {
      // Append the server messages to appropriate position in the list.
      const reconcile = this.reconcileMessages(messages, serverMessages)
      this.localMessages.set(channelIdString, reconcile)
    }

    messages = this.localMessages.get(channelIdString)
    this.messagesListener.forEach((listener) =>
      listener.onMessages(channelId, messages || [], eventType)
    )

    this.newMessageListeners.forEach((listener) =>
      listener.onNewMessages(channelId, messages || [])
    )
  }

  private updateAndBroadcastEmoji(
    channelId: bigint,
    reaction: ChatReactionType,
    eventType: MessageEventEnum
  ) {
    const channelIdString = channelId.toString()
    let messages = this.localMessages.get(channelIdString)
    if (messages) {
      const newMsgs = messages.map((message) => {
        if (message.id.toString() === reaction.message_id.toString()) {
          if (message.reactions) {
            message.reactions.push(reaction)
          } else {
            message.reactions = [reaction]
          }
        }
        return message
      })
      // Append the server messages to appropriate position in the list.
      const reconcile = this.reconcileMessages(messages, newMsgs)
      this.localMessages.set(channelIdString, reconcile)
    }

    messages = this.localMessages.get(channelIdString)
    this.messagesListener.forEach((listener) =>
      listener.onMessages(channelId, messages || [], eventType)
    )
  }

  getMessages(channelId: bigint, lastMessageId: bigint): ChatMessageType[] | undefined {
    const messages = this.localMessages.get(channelId.toString())
    if (!messages) {
      // Load this message in the background
      this.loadMessages(channelId, lastMessageId, MessageEventEnum.LOAD_SUFFIX)
    }

    return messages
  }

  setScrollingPosition(channelId: bigint, scrollPosition: number) {
    this.lastScrollPosition.set(channelId.toString(), scrollPosition)
  }

  getScrollingPosition(channelId: bigint): number {
    return this.lastScrollPosition.get(channelId.toString()) || -1
  }

  async sendMessageWithImage(channelId: bigint, msg: string, files: File[]) {
    const uploadImageResult = await uploadFile(files)
    if (!uploadImageResult.error && uploadImageResult.value) {
      await sendMessageApi(channelId, msg, [
        {
          url: uploadImageResult.value,
        },
      ])
    }
  }

  getOnlineUsers(communityHandle: string): Map<string, UserType> {
    return this.userStatuses.get(communityHandle) || new Map<string, UserType>()
  }

  broadcastStatusChanges(communityHandle: string, onlineUsers: Map<string, UserType>) {
    this.chatStatusListener.forEach((listener) =>
      listener.onStatusChanged(communityHandle, onlineUsers)
    )
  }
}

const chatController = new ChatController()

export default chatController
