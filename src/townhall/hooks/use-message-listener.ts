import { useEffect, useState } from 'react'

import messageManager from '@/townhall/engine/services/message-manager'
import { MessageHistoryItem } from '@/types/townhall'

export default function useMessageListener() {
  const [newMessage, setNewMessage] = useState<MessageHistoryItem | undefined>(undefined)

  useEffect(() => {
    const onMessage = (message: MessageHistoryItem) => {
      setNewMessage(message)
    }
    messageManager.addListener(onMessage)

    return () => {
      messageManager.removeListener(onMessage)
    }
  })

  return newMessage
}
