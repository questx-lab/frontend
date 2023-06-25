import '@/townhall/phaser-game'

import { FC } from 'react'

import tw from 'twin.macro'

import RoomStore from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import { Horizontal, Vertical, VerticalCenter } from '@/widgets/orientation'

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
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)

  phaserGame.loadResource('0000')

  console.log('index 1')

  // const t = phaserGame.config

  console.log('index 2')

  return (
    <Backdrop id='phaser-container'>
      {/* <Connectting /> */}

      <LeftContent>
        {/* {activeTab === ActiveSidebarTab.CHAT && (
          <>
            <ChatFrame>
              <Chat />
            </ChatFrame>
            <VerticalDivider thickness={2} />
          </>
        )} */}
        {/* <GameSidebarFrame>
          <GameSidebar />
        </GameSidebarFrame> */}
      </LeftContent>
    </Backdrop>
  )
}

export default Townhall
