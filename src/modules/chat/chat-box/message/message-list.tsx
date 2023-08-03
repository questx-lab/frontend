import { FC, useEffect, useRef, useState } from 'react'

import tw from 'twin.macro'

import MessageItem from '@/modules/chat/chat-box/message/message-item'
import chatController, { MessageEventEnum } from '@/modules/chat/services/chat-controller'
import ChatStore from '@/store/chat/chat'
import { ChatMessageType } from '@/types/chat'
import { VerticalFullWidth } from '@/widgets/orientation'

const Frame = tw(VerticalFullWidth)`h-full overflow-y-scroll gap-5`

// The number of milliseconds since data update till we update scroll position (or do smooth
// scrolling)
const DELAY_SCROLL_TIME = 100

const MessageList: FC = () => {
  const currentChannel = ChatStore.useStoreState((state) => state.selectedChannel)
  const messageListRef = useRef<null | HTMLDivElement>(null)
  const channelIdString = currentChannel.id.toString()
  const [messages, setMessages] = useState<ChatMessageType[] | undefined>([])

  // Set the scroll position
  useEffect(() => {
    setMessages(chatController.getMessages(currentChannel.id, BigInt(0)))

    setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight
      }
    }, DELAY_SCROLL_TIME)
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
        switch (eventType) {
          case MessageEventEnum.LOAD_PREFIX:
            // When more items are appended at the front of the list, the scroll position changes. We
            // want to make sure user still the last scroll item.
            if (messageListRef.current) {
              const oldHeight = messageListRef.current.scrollHeight
              const oldTop = messageListRef.current.scrollTop
              requestAnimationFrame(() => {
                if (messageListRef.current) {
                  const newHeight = messageListRef.current.scrollHeight
                  messageListRef.current.scrollTo({ top: oldTop + newHeight - oldHeight })
                }
              })
            }
            break
          case MessageEventEnum.LOAD_SUFFIX:
          case MessageEventEnum.NEW_MESSAGES:
            // When scroll position is the last. We should scroll to the last if we have new messages.
            // If position is not the last. We still stay in current scroll position
            if (messageListRef.current) {
              const oldHeight = messageListRef.current.scrollHeight
              const oldTop = messageListRef.current.scrollTop
              const distance = oldHeight - oldTop
              // distance between scroll height and last scroll top
              const lastTopHeightDistance = 835
              if (distance >= lastTopHeightDistance - 10 && distance <= lastTopHeightDistance + 10)
                requestAnimationFrame(() => {
                  if (messageListRef.current) {
                    const newHeight = messageListRef.current.scrollHeight
                    messageListRef.current.scrollTo({ top: oldTop + newHeight - oldHeight })
                  }
                })
            }
            break

          default:
            break
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
    if (event.currentTarget.scrollTop < 300) {
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
