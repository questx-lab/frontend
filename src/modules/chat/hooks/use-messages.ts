import { useEffect, useState } from 'react'

import chatController from '@/modules/chat/services/chat-controller'
import { ChatMessageType } from '@/types/chat'

export default function useMessages(targetChannelId: BigInt) {
  const [messages, setMessages] = useState<ChatMessageType[]>(
    chatController.getMessages(targetChannelId)
  )

  useEffect(() => {
    const listener = {
      onMessages: (channelId: BigInt, newMessages: ChatMessageType[]) => {
        if (targetChannelId === channelId) {
          setMessages(newMessages)
        }
      },
    }

    chatController.addMessagesListener(listener)

    return () => {
      chatController.removeMessagesListener(listener)
    }
  }, [])

  return messages
}
