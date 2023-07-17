import { FC, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getMessagesApi } from '@/api/chat'
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
import { SmallSpinner } from '@/widgets/spinner'
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
