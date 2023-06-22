import '@/townhall/phaser-game'

import { FC } from 'react'

import tw from 'twin.macro'

import RoomStore from '@/store/townhall/room'
import { Connectting } from '@/townhall/components/connect'
import GameSidebar from '@/townhall/components/game-sidebar'
import Chat from '@/townhall/room/chat'
import { Horizontal, Vertical, VerticalCenter } from '@/widgets/orientation'
import { VerticalDivider } from '@/widgets/separator'

const Backdrop = tw(VerticalCenter)`
  absolute
  w-full
  h-full
`

const LeftContent = tw(Horizontal)`
  h-full
  bg-white
  right-0
  fixed
`

const ChatFrame = tw(Vertical)`
  w-[256px]
  h-full
`

const GameSidebarFrame = tw(Vertical)`
  w-[64px]
  h-full
`

const Townhall: FC = () => {
  // data
  const showChat = RoomStore.useStoreState((state) => state.showChat)

  return (
    <Backdrop id='phaser-container'>
      <Connectting />

      <LeftContent>
        {showChat && (
          <>
            <ChatFrame>
              <Chat />
            </ChatFrame>
            <VerticalDivider thickness={2} />
          </>
        )}
        <GameSidebarFrame>
          <GameSidebar />
        </GameSidebarFrame>
      </LeftContent>
    </Backdrop>
  )
}

export default Townhall
