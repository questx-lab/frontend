import { getChannelsApi, getMessagesApi } from '@/api/chat'
import network from '@/modules/chat/services/network'
import {
  ChannelType,
  ChatMessageReceiver,
  ChatMessageReceiverEnum,
  ChatMessageType,
} from '@/types/chat'

export interface ChannelsListener {
  onChannelsChanged: (handle: string, newChannels: ChannelType[]) => void
}

export interface MessagesListener {
  onMessages: (channelId: bigint, messages: ChatMessageType[]) => void
}

class ChatController {
  private networkListener = {
    onConnected: () => {},

    onDisconnected: async () => {},

    onMessage: (s: ChatMessageReceiver) => {
      switch (s.o) {
        case ChatMessageReceiverEnum.MESSAGE_CREATED:
          const chatMessage = s.d as ChatMessageType
          // prepend the message to the list
          const cache = this.localMessages.get(chatMessage.channel_id.toString()) || []

          const newArr = cache.slice()
          newArr.push(chatMessage)

          this.updateAndBroadcastMessages(chatMessage.channel_id, newArr)
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

  private async loadMessages(channelId: bigint, lastMessageId: bigint) {
    const res = await getMessagesApi(channelId, lastMessageId)
    if (res.code === 0 && res.data) {
      const messages = [...res.data.messages].reverse()

      this.updateAndBroadcastMessages(channelId, messages)
    }
  }

  private reconcileMessages(
    messages: ChatMessageType[],
    serverMessages: ChatMessageType[]
  ): ChatMessageType[] {
    let result: ChatMessageType[] = []
    for (let i = 0, j = 0; i < messages.length && j < serverMessages.length; ) {
      if (messages[i].id === serverMessages[j].id) {
        result.push(serverMessages[j])
        i++
        j++
      } else if (messages[i].id < serverMessages[j].id) {
        result.push(messages[i])
        i++
      } else {
        result.push(serverMessages[j])
        j++
      }
    }

    // Add the rest of the messages to the result.
    for (let i = 0; i < messages.length; i++) {
      result.push(messages[i])
    }

    for (let j = 0; j < serverMessages.length; j++) {
      result.push(serverMessages[j])
    }

    return result
  }

  private updateAndBroadcastMessages(channelId: bigint, serverMessages: ChatMessageType[]) {
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
    this.messagesListener.forEach((listener) => listener.onMessages(channelId, messages || []))
  }

  getMessages(channelId: bigint, lastMessageId: bigint): ChatMessageType[] | undefined {
    const messages = this.localMessages.get(channelId.toString())
    if (!messages) {
      // Load this message in the background
      this.loadMessages(channelId, lastMessageId)
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
