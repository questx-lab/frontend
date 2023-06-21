import { MessageMessage } from '@/types/townhall'

export interface Listener {
  onMessage: (message: MessageMessage) => {}
}

class MessagesManager {
  listeners: Map<Listener, boolean>

  constructor() {
    this.listeners = new Map()
  }

  onNewMessage(message: string) {
    for (let listener of this.listeners.keys()) {
      listener.onMessage({
        value: message,
      })
    }
  }
}

const messagesManager = new MessagesManager()
export default messagesManager
