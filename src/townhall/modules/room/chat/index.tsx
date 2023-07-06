import { FC, useEffect, useRef, useState } from 'react'

import tw from 'twin.macro'

import { MessageReceiverEnum } from '@/constants/townhall'
import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import messageManager from '@/townhall/engine/services/message-manager'
import network from '@/townhall/engine/services/network'
import useMessageListener from '@/townhall/hooks/use-message-listener'
import InputBox from '@/townhall/modules/room/chat/input-box'
import MessageItem from '@/townhall/modules/room/chat/message-item'
import { MessageHistoryItem } from '@/types/townhall'
import {
  Horizontal,
  Stretch,
  Vertical,
  VerticalFullWidth,
  VerticalStretch,
} from '@/widgets/orientation'
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

const Chat: FC = () => {
  const [messages, setMessages] = useState<MessageHistoryItem[]>([])
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const newMessage = useMessageListener()

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
  const setActiveTab = RoomStore.useStoreActions((action) => action.toggleTab)

  const onNewMessagedEntered = (message: string) => {
    network.send({
      type: MessageReceiverEnum.MESSAGE,
      value: {
        message,
      },
    })
  }

  return (
    <>
      <Header>
        <Stretch>
          <TextXl>Chatbox</TextXl>
        </Stretch>
        <XMarkIcon
          className='w-7 h-7 cursor-pointer'
          onClick={() => {
            setActiveTab(ActiveSidebarTab.NONE)
            phaserGame.resume()
          }}
        />
      </Header>

      <Divider />

      <ContentFrame>
        {messages.map((item, index) => {
          return (
            <VerticalFullWidth key={index}>
              <MessageItem message={item} />
              <Gap height={2} />
            </VerticalFullWidth>
          )
        })}
        <div ref={messagesEndRef} />
      </ContentFrame>
      <Divider thickness={2} />
      <InputFrame>
        <InputBox onNewMessagedEntered={onNewMessagedEntered} />
      </InputFrame>
    </>
  )
}

export default Chat
