import { useEffect, useState } from 'react'

import chatController from '@/modules/chat/services/chat-controller'
import { ChatMessageType } from '@/types/chat'

export default function useMessages(targetChannelId: bigint) {
  const [messages, setMessages] = useState<ChatMessageType[]>(
    chatController.getMessages(targetChannelId)
  )

  useEffect(() => {
    const listener = {
      onMessages: (channelId: bigint, newMessages: ChatMessageType[]) => {
        // TODO: Fix this string comparison
        if (targetChannelId.toString() === channelId.toString()) {
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
