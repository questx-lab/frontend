import { FC, useEffect, useRef, useState } from 'react'

import tw from 'twin.macro'

import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import Bootstrap from '@/townhall/engine/scenes/bootstrap'
import messageManager from '@/townhall/engine/services/message-manager'
import useMessageListener from '@/townhall/hooks/use-message-listener'
import phaserGame from '@/townhall/phaser-game'
import MessageItem from '@/townhall/room/chat/message-item'
import { MessageHistoryItem } from '@/types/townhall'
import { Horizontal, Stretch, Vertical, VerticalStretch } from '@/widgets/orientation'
import { Divider, Gap } from '@/widgets/separator'
import { TextXl } from '@/widgets/text'
import { XMarkIcon } from '@heroicons/react/24/outline'

const ContentFrame = tw(VerticalStretch)`
  w-full
  px-4
  pt-6
  pb-4
  overflow-y-scroll
`

const InputFrame = tw(Vertical)`
  w-full
  p-6
`

const Header = tw(Horizontal)`
  w-full
  px-4
  py-6
`

const InputBox = tw.input`
  w-full
  border
  border-[1px]
  border-solid
  border-gray-300
  p-3
  rounded-lg
`

const Chat: FC = () => {
  const [messages, setMessages] = useState<MessageHistoryItem[]>([])
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const newMessage = useMessageListener()

  const [inputMessage, setInputMessage] = useState<string>('')

  useEffect(() => {
    // Get the current list of chat history
    setMessages(messageManager.getMessageHistory())
  }, [])

  useEffect(() => {
    if (newMessage) {
      setMessages((prev) => prev.concat(newMessage))
    }
  }, [newMessage, setMessages])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // action
  const setActiveTab = RoomStore.useStoreActions((action) => action.setActiveTab)

  const handleKeyboardEvent = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      // Send the message

      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
      bootstrap.network.sendChatMessage(inputMessage)

      setInputMessage('')
    }
  }

  return (
    <>
      <Header>
        <Stretch>
          <TextXl>Chatbox</TextXl>
        </Stretch>
        <XMarkIcon
          className='w-7 h-7 cursor-pointer'
          onClick={() => setActiveTab(ActiveSidebarTab.NONE)}
        />
      </Header>

      <Divider />

      <ContentFrame>
        {messages.map((item, index) => {
          return (
            <Vertical key={index}>
              <MessageItem message={item} />
              <Gap height={2} />
            </Vertical>
          )
        })}
        <div ref={messagesEndRef} />
      </ContentFrame>
      <Divider thickness={2} />
      <InputFrame>
        <InputBox
          value={inputMessage}
          onKeyDown={handleKeyboardEvent}
          onChange={(e) => {
            setInputMessage(e.target.value)
            e.stopPropagation()
          }}
        />
      </InputFrame>
    </>
  )
}

export default Chat
