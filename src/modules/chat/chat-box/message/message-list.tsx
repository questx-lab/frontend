import { FC, useEffect, useRef, useState } from 'react'

import tw from 'twin.macro'

import MessageItem from '@/modules/chat/chat-box/message/message-item'
import chatController, { MessageEventEnum } from '@/modules/chat/services/chat-controller'
import ChatStore from '@/store/chat/chat'
import { ChatMessageType } from '@/types/chat'
import { VerticalFullWidth } from '@/widgets/orientation'

const Frame = tw(VerticalFullWidth)`h-full overflow-y-scroll gap-5`

const MessageList: FC = () => {
  const currentChannel = ChatStore.useStoreState((state) => state.selectedChannel)
  const messageListRef = useRef<null | HTMLDivElement>(null)
  const channelIdString = currentChannel.id.toString()
  const [messages, setMessages] = useState<ChatMessageType[] | undefined>([])

  // Set the scroll position
  useEffect(() => {
    if (messageListRef.current) {
      let position = chatController.getScrollingPosition(currentChannel.id)
      if (position < 0) {
        position = 1000000 // first time open, just scroll to the bottom.
      }
      messageListRef.current.scrollTop = position
    }

    setMessages(chatController.getMessages(currentChannel.id, BigInt(0)))
  }, [currentChannel.id])

  // Listen to any message change propagated by the chat controller.
  useEffect(() => {
    const listener = {
      onMessages: (
        channelId: bigint,
        newMessages: ChatMessageType[],
        eventType: MessageEventEnum
      ) => {
        if (channelIdString !== channelId.toString()) {
          return
        }

        setMessages(newMessages)

        if (
          eventType === MessageEventEnum.LOAD_PREFIX ||
          eventType === MessageEventEnum.REACTION_ADDED
        ) {
          // Set the position of the scroll to the last position.
          if (messageListRef.current) {
            const oldHeight = messageListRef.current.scrollHeight
            const oldTop = messageListRef.current.scrollTop
            setTimeout(() => {
              if (messageListRef.current) {
                const newHeight = messageListRef.current.scrollHeight
                messageListRef.current.scrollTo({ top: oldTop + newHeight - oldHeight })
              }
            }, 200)
          }
        } else {
          setTimeout(() => {
            if (messageListRef.current) {
              messageListRef.current.scrollTo({ top: 1000000 })
            }
          }, 200)
        }
      },
    }

    chatController.addMessagesListener(listener)

    return () => {
      chatController.removeMessagesListener(listener)
    }
  }, [channelIdString])

  // Start of rendering.
  if (currentChannel.id === BigInt(0)) {
    return <Frame />
  }

  if (!messages || messages.length === 0) {
    return <Frame />
  }

  const renderMessages = messages.map((message, index) => (
    <MessageItem key={index} message={message} />
  ))

  const handleOnScroll = (event: any) => {
    chatController.setScrollingPosition(currentChannel.id, event.currentTarget.scrollTop)
    if (event.currentTarget.scrollTop === 0) {
      const lastMessageId: bigint =
        messages !== undefined && messages.length > 0 ? messages[0].id : BigInt(0)
      chatController.loadMessages(currentChannel.id, lastMessageId, MessageEventEnum.LOAD_PREFIX)
    }
  }

  return (
    <Frame onScroll={handleOnScroll} ref={messageListRef}>
      {renderMessages}
    </Frame>
  )
}

export default MessageList
