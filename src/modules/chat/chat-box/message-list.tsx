import { FC, useEffect, useRef, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import tw from 'twin.macro'

import chatController from '@/modules/chat/services/chat-controller'
import ChatStore from '@/store/chat/chat'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { ChatMessageType } from '@/types/chat'
import { UserAvatar } from '@/widgets/avatar'
import { HorizontalFullWidth, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { LightTextBase, MediumTextSm } from '@/widgets/text'

const Frame = tw(VerticalFullWidth)`h-full overflow-y-scroll gap-6`

const GapHorizontal = styled(HorizontalFullWidth)<{ isOwnser?: boolean }>(
  ({ isOwnser = false }) => {
    const styles = [tw`gap-3  cursor-pointer `]
    if (isOwnser) {
      styles.push(tw`flex-row-reverse`)
    }

    return styles
  }
)

const GapVertical = styled(Vertical)<{ isOwnser?: boolean }>(({ isOwnser = false }) => {
  const styles = [tw`gap-1 justify-center bg-cyan-50 rounded-lg p-3 max-w-[80%]`]
  if (isOwnser) {
    styles.push(tw`bg-primary-100`)
  } else {
    styles.push(tw`bg-cyan-50`)
  }

  return styles
})

const MessageItem: FC<{ message: ChatMessageType }> = ({ message }) => {
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  if (!user) {
    return <></>
  }

  // Sender
  if (message.author.id === user.id) {
    return (
      <GapHorizontal isOwnser>
        <GapVertical isOwnser>
          <LightTextBase>{message.content}</LightTextBase>
        </GapVertical>
      </GapHorizontal>
    )
  }

  // Messages from other people
  return (
    <GapHorizontal>
      <UserAvatar user={message.author} size={32} />
      <GapVertical>
        <MediumTextSm>{message.author.name}</MediumTextSm>
        <LightTextBase>{message.content}</LightTextBase>
      </GapVertical>
    </GapHorizontal>
  )
}

const MessageList: FC = () => {
  const currentChannel = ChatStore.useStoreState((state) => state.selectedChannel)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const messageList = useRef<null | HTMLDivElement>(null)
  const channelIdString = currentChannel.id.toString()
  const [messages, setMessages] = useState<ChatMessageType[] | undefined>(
    chatController.getMessages(currentChannel.id, BigInt(0))
  )

  useEffect(() => {
    if (messageList.current) {
      let position = chatController.getScrollingPosition(currentChannel.id)
      if (position < 0) {
        position = 1000000 // first time open, just scroll to the bottom.
      }
      messageList.current.scrollTop = position
    }
  }, [currentChannel.id])

  // Listen to any message change propagated by the chat controller.
  useEffect(() => {
    const listener = {
      onMessages: (channelId: bigint, newMessages: ChatMessageType[]) => {
        if (channelIdString !== channelId.toString()) {
          return
        }

        if (!messages) {
          setMessages(newMessages)
        } else {
          setMessages(newMessages)
        }
      },
    }

    chatController.addMessagesListener(listener)

    return () => {
      if (messagesEndRef.current) {
        console.log('scroll = ', messagesEndRef.current.scrollTo)
      } else {
        console.log('messagesEndRef.current is null')
      }
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

  const renderMessages = messages.map((message) => (
    <MessageItem key={message.id} message={message} />
  ))

  const handleOnScroll = (event: any) => {
    // console.log('event.currentTarget.scrollTop = ', event.currentTarget.scrollTop)
    chatController.setScrollingPosition(currentChannel.id, event.currentTarget.scrollTop)
  }

  return (
    <Frame onScroll={handleOnScroll} ref={messageList}>
      {renderMessages}
      <div ref={messagesEndRef} />
    </Frame>
  )
}

export default MessageList
