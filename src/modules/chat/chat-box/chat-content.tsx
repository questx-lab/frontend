import { FC, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import tw from 'twin.macro'

import { getMessagesApi } from '@/api/chat'
import { ChatMessageType } from '@/types/chat'
import { UserAvatar } from '@/widgets/avatar'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { SmallSpinner } from '@/widgets/spinner'
import { LightTextBase, MediumTextSm } from '@/widgets/text'

const Frame = tw(VerticalFullWidth)`h-full overflow-y-scroll gap-6`

const GapHorizontal = tw(HorizontalFullWidth)`gap-3  cursor-pointer`
const GapVertical = tw(VerticalFullWidth)`gap-1 justify-center`
const FullSize = tw(HorizontalBetweenCenterFullWidth)`h-full`

const MessageItem: FC<{ message: ChatMessageType }> = ({ message }) => {
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

const ChatContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    try {
      const { error, data } = await getMessagesApi()
      if (error) {
        toast.error(error)
        return
      }
      if (data) {
        setMessages(data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <FullSize>
        <SmallSpinner />
      </FullSize>
    )
  }

  if (messages.length === 0) {
    return <></>
  }

  const renderMessages = messages.map((message) => (
    <MessageItem key={message.id} message={message} />
  ))

  // TODO: infinite loop here
  return <Frame>{renderMessages}</Frame>
}

export default ChatContent
