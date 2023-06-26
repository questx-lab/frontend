import { FC, useEffect } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { GlobalStoreModel } from '@/store/store'
import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import GameSidebar from '@/townhall/modules/game-sidebar'
import Chat from '@/townhall/modules/room/chat'
import { Connectting } from '@/townhall/modules/room/connect'
import { UserType } from '@/types'
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
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)
  const gameRooms = RoomStore.useStoreState((state) => state.gameRooms)
  const roomId = gameRooms.length > 0 ? gameRooms[0].id : ''

  // TODO: support multiple room id. For now, only use the first room id.
  useEffect(() => {
    phaserGame.bootstrap(roomId)
  }, [roomId])

  useEffect(() => {
    phaserGame.setUser(user)
  }, [user])

  return (
    <Backdrop id='phaser-container'>
      <Connectting />

      <LeftContent>
        {activeTab === ActiveSidebarTab.CHAT && (
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
