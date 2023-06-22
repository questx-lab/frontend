import { MessageHistoryItem } from '@/types/townhall'

export interface Listener {
  onMessage: (message: MessageHistoryItem) => {}
}

class MessageManager {
  private messages: MessageHistoryItem[]
  listeners: Map<(message: MessageHistoryItem) => void, boolean>

  constructor() {
    this.listeners = new Map()
    this.messages = []
  }

  initMessageList(list: MessageHistoryItem[]) {
    if (this.messages.length === 0) {
      this.messages = list
    }
  }

  onNewMessage(message: MessageHistoryItem) {
    for (let listener of this.listeners.keys()) {
      listener(message)
    }
  }

  addListener(listener: (message: MessageHistoryItem) => void) {
    this.listeners.set(listener, true)
  }

  removeListener(listener: (message: MessageHistoryItem) => void) {
    this.listeners.delete(listener)
  }

  getMessageHistory(): MessageHistoryItem[] {
    return [...this.messages]
  }
}

const messageManager = new MessageManager()
export default messageManager
