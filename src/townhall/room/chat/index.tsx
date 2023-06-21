import { FC } from 'react'

import tw from 'twin.macro'

import RoomStore from '@/store/townhall/room'
import MessageItem from '@/townhall/room/chat/message-item'
import { TextInput } from '@/widgets/input'
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

const Chat: FC = () => {
  const list = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]

  // action
  const setShowChat = RoomStore.useStoreActions((action) => action.setShowChat)

  return (
    <>
      <Header>
        <Stretch>
          <TextXl>Chatbox</TextXl>
        </Stretch>
        <XMarkIcon className='w-7 h-7 cursor-pointer' onClick={() => setShowChat(false)} />
      </Header>

      <Divider />

      <ContentFrame>
        {list.map((item, index) => {
          return (
            <Vertical key={index}>
              <MessageItem />
              <Gap height={2} />
            </Vertical>
          )
        })}
      </ContentFrame>
      <Divider thickness={2} />
      <InputFrame>
        <TextInput onChange={() => {}} />
      </InputFrame>
    </>
  )
}

export default Chat
