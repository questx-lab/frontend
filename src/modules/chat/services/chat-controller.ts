import { getChannelsApi, getMessagesApi } from '@/api/chat'
import network from '@/modules/chat/services/network'
import {
  ChannelType,
  ChatMessageReceiver,
  ChatMessageReceiverEnum,
  ChatMessageType,
} from '@/types/chat'

const DEFAULT_LIMIT = 50

export enum MessageEventEnum {
  LOAD_PREFIX,
  LOAD_SUFFIX,
  NEW_MESSAGES,
}

export interface ChannelsListener {
  onChannelsChanged: (handle: string, newChannels: ChannelType[]) => void
}

export interface MessagesListener {
  onMessages: (channelId: bigint, messages: ChatMessageType[], eventType: MessageEventEnum) => void
}

class ChatController {
  private networkListener = {
    onConnected: () => {},

    onDisconnected: async () => {},

    onMessage: (s: ChatMessageReceiver) => {
      switch (s.o) {
        case ChatMessageReceiverEnum.MESSAGE_CREATED:
          const chatMessage = s.d as ChatMessageType

          this.updateAndBroadcastMessages(
            chatMessage.channel_id,
            [chatMessage],
            MessageEventEnum.NEW_MESSAGES
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

    this.isLoadingPrefix.set(channelIdString, false)
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
}

const chatController = new ChatController()

export default chatController
