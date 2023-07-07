import { FC, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { GlobalStoreModel } from '@/store/store'
import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import usePlayerSelector from '@/townhall/hooks/user-player-selector'
import GameSidebar from '@/townhall/modules/game-sidebar'
import Chat from '@/townhall/modules/room/chat'
import { Connectting } from '@/townhall/modules/room/connect'
import GameSelector from '@/townhall/modules/selector/game'
import { UserType } from '@/types'
import { Horizontal, HorizontalCenter, Vertical, VerticalCenter } from '@/widgets/orientation'
import { VerticalDivider } from '@/widgets/separator'
import Instruction from '@/townhall/modules/selector/instruction'
import BaseModal from '@/widgets/modal/base'

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

const ModalBox = tw(HorizontalCenter)`
  flex
  h-full
  items-center
  justify-center
  text-center
  py-6
`

const Townhall: FC = () => {
  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)
  const gameRooms = RoomStore.useStoreState((state) => state.gameRooms)
  const roomId = gameRooms.length > 0 ? gameRooms[0].id : ''
  const playerSelector = usePlayerSelector()

  const hasShowedInstruction = localStorage.getItem('showed_instruction')

  const [showInstructionModal, setShowInstructionModal] = useState<boolean>(false)

  // TODO: support multiple room id. For now, only use the first room id.
  useEffect(() => {
    phaserGame.bootstrap(roomId)
    if (!hasShowedInstruction) setShowInstructionModal(true)
  }, [roomId])

  useEffect(() => {
    phaserGame.setUser(user)
  }, [user])

  return (
    <Backdrop id='phaser-container'>
      <Connectting />
      <GameSelector playerSelector={playerSelector} />
      <BaseModal isOpen={showInstructionModal}>
        <ModalBox>
          <Instruction setOpen={setShowInstructionModal}></Instruction>
        </ModalBox>
      </BaseModal>

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
