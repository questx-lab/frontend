import { FC } from 'react'

import tw from 'twin.macro'

import ChatIndex from '@/modules/chat'
import ChatBox from '@/modules/chat/chat-box'
import ChannelSide from '@/modules/chat/message/channel-side'
import { VerticalCenter } from '@/widgets/orientation'

const MainFrame = tw.div`
  w-full
  h-[calc(100vh_-_64px)]
  mt-[64px]
`

const ChatFrame = tw(VerticalCenter)`
  w-full
  h-[calc(100vh_-_64px)]
`

const FixedWidth = tw.div`
  w-[640px]
  h-full
`

const Index: FC = () => {
  return (
    <ChatIndex
      children={
        <MainFrame>
          <ChannelSide />

          <ChatFrame>
            <FixedWidth>
              <ChatBox />
            </FixedWidth>
          </ChatFrame>
        </MainFrame>
      }
    ></ChatIndex>
  )
}

export default Index
