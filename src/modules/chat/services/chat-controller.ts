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
          const cache = this.messagesCache.get(chatMessage.channel_id.toString()) || []

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
  private messagesCache = new Map<string, ChatMessageType[]>()

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

  async loadMessages(channelId: bigint, lastMessageId: bigint) {
    const res = await getMessagesApi(channelId, lastMessageId)
    if (res.code === 0 && res.data) {
      const messages = [...res.data.messages].reverse()

      this.updateAndBroadcastMessages(channelId, messages)
    }
  }

  private updateAndBroadcastMessages(channelId: bigint, messages: ChatMessageType[]) {
    this.messagesCache.set(channelId.toString(), messages)
    this.messagesListener.forEach((listener) => listener.onMessages(channelId, messages))
  }

  getMessages(channelId: bigint, lastMessageId: bigint): ChatMessageType[] | undefined {
    const messages = this.messagesCache.get(channelId.toString())
    if (!messages) {
      // Load this message in the background
      this.loadMessages(channelId, lastMessageId)
    }
    return messages
  }
}

const chatController = new ChatController()

export default chatController
