import { FC, useEffect, useRef } from 'react'

import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import tw from 'twin.macro'

import useMessages from '@/modules/chat/hooks/use-messages'
import chatController from '@/modules/chat/services/chat-controller'
import ChatStore from '@/store/chat/chat'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { ChatMessageType } from '@/types/chat'
import { UserAvatar } from '@/widgets/avatar'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
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

const FullSize = tw(HorizontalBetweenCenterFullWidth)`h-full`

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
  const messages = useMessages(currentChannel.id)

  useEffect(() => {
    chatController.loadMessages(currentChannel.id, BigInt(0))
  }, [currentChannel.id])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (currentChannel.id === BigInt(0)) {
    return <Frame />
  }

  if (messages.length === 0) {
    return <Frame />
  }

  const renderMessages = messages.map((message) => (
    <MessageItem key={message.id} message={message} />
  ))

  return (
    <Frame>
      {renderMessages} <div ref={messagesEndRef} />
    </Frame>
  )
}

export default MessageList
