import { getChannelsApi, getMessagesApi } from '@/api/chat'
import network from '@/modules/chat/services/network'
import { ChannelType, ChatMessageReceiver, ChatMessageType } from '@/types/chat'

export interface ChannelsListener {
  onChannelsChanged: (handle: string, newChannels: ChannelType[]) => void
}

export interface MessagesListener {
  onMessages: (channelId: BigInt, messages: ChatMessageType[]) => void
}

class ChatController {
  private networkListener = {
    onConnected: () => {},

    onDisconnected: async () => {},

    onMessage: (s: ChatMessageReceiver) => {},
  }

  // Channels
  private channelListeners = new Set<ChannelsListener>()
  private channelsCache = new Map<string, ChannelType[]>()

  // Messages
  private messagesListener = new Set<MessagesListener>()
  private messagesCache = new Map<BigInt, ChatMessageType[]>()

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
    console.log('Loading channel....')
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

  async loadMessages(channelId: BigInt, lastMessageId: BigInt) {
    const res = await getMessagesApi(channelId, lastMessageId)
    if (res.code === 0 && res.data) {
      const messages = res.data.messages

      this.messagesCache.set(channelId, messages)
      this.messagesListener.forEach((listener) => listener.onMessages(channelId, messages))
    }
  }

  getMessages(channelId: BigInt): ChatMessageType[] {
    return this.messagesCache.get(channelId) || []
  }
}

const chatController = new ChatController()

export default chatController
