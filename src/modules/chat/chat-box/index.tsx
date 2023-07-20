import { FC } from 'react'

import tw from 'twin.macro'

import { sendMessageApi } from '@/api/chat'
import ChatContent from '@/modules/chat/chat-box/chat-content'
import ChatInput from '@/modules/chat/chat-box/chat-input'
import ChatStore from '@/store/chat/chat'
import { VerticalFullWidth } from '@/widgets/orientation'

const Frame = tw(VerticalFullWidth)`
  h-full
  p-6
  gap-3
`

const ChatBox: FC = () => {
  const currentChannel = ChatStore.useStoreState((state) => state.selectedChannel)

  const onNewMessagedEntered = (message: string) => {
    sendMessageApi(currentChannel.id, message)
  }

  return (
    <Frame>
      <ChatContent />
      <ChatInput onNewMessagedEntered={onNewMessagedEntered} />
    </Frame>
  )
}

export default ChatBox
