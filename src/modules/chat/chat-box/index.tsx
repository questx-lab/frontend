import { FC } from 'react'

import tw from 'twin.macro'

import ChatContent from '@/modules/chat/chat-box/chat-content'
import ChatInput from '@/modules/chat/chat-box/chat-input'
import { VerticalFullWidth } from '@/widgets/orientation'

const Frame = tw(VerticalFullWidth)`
  h-full
  p-6
  gap-3
`

const ChatBox: FC = () => {
  const onNewMessagedEntered = (message: string) => {
    console.log(message)
  }

  return (
    <Frame>
      <ChatContent />
      <ChatInput onNewMessagedEntered={onNewMessagedEntered} />
    </Frame>
  )
}

export default ChatBox
