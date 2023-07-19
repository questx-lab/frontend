import { getChannelsApi } from '@/api/chat'
import network from '@/modules/chat/services/network'
import { ChatMessageReceiver } from '@/types/chat'

class ChatController {
  private networkListener = {
    onConnected: () => {},

    onDisconnected: async () => {},

    onMessage: (s: ChatMessageReceiver) => {},
  }

  constructor() {
    network.addListener(this.networkListener)
  }

  connect() {
    network.connect()
  }

  async getChannels(handle: string) {
    const channels = await getChannelsApi(handle)
  }
}

const chatController = new ChatController()

export default chatController
