import { FC, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { getMyCharactersApi } from '@/api/townhall'
import { GlobalStoreModel } from '@/store/store'
import RoomStore from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import usePlayerSelector from '@/townhall/hooks/user-player-selector'
import { Connectting } from '@/townhall/modules/room/connect'
import Browser from '@/townhall/modules/room/interactive/browser'
import Mobile from '@/townhall/modules/room/interactive/mobile'
import SelectCharacter from '@/townhall/modules/selector/character'
import GameSelector from '@/townhall/modules/selector/game'
import LeaderboardSelector from '@/townhall/modules/selector/leaderboard'
import { UserType } from '@/types'
import BaseModal from '@/widgets/modal/base'
import { Horizontal, HorizontalCenter, Vertical, VerticalCenter } from '@/widgets/orientation'
import { VerticalDivider } from '@/widgets/separator'
import Instruction from '@/townhall/modules/selector/instruction'
import { getShowedInstruction } from '@/utils/helper'

const Backdrop = tw(VerticalCenter)`
  absolute
  w-full
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

const FixedModalBox = tw.div`
  fixed
  left-10
  bottom-10
`

const Townhall: FC = () => {
  // data
  const community = RoomStore.useStoreState((state) => state.community)
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)
  const gameRooms = RoomStore.useStoreState((state) => state.gameRooms)
  const roomId = gameRooms.length > 0 ? gameRooms[0].id : ''
  const playerSelector = usePlayerSelector()
  const showCharacterSelectModal = RoomStore.useStoreState(
    (state) => state.showCharacterSelectModal
  )

  const [showInstructionModal, setShowInstructionModal] = useState<boolean>(false)

  const hasShowedInstruction = getShowedInstruction()

  // TODO: support multiple room id. For now, only use the first room id.
  useEffect(() => {
    phaserGame.bootstrap(roomId)
  }, [roomId])
  const setShowCharacterSelectModal = RoomStore.useStoreActions(
    (action) => action.setShowCharacterSelectModal
  )

  const fetchMyUsers = async () => {
    const resp = await getMyCharactersApi(community.handle)

    if (resp.data && resp.data.user_characters.length === 0) {
      setShowCharacterSelectModal(true)
    } else {
      phaserGame.bootstrap(roomId)
      if (!hasShowedInstruction) setShowInstructionModal(true)
    }
  }

  const onCharacterSelected = () => {
    phaserGame.bootstrap(roomId)
    if (!hasShowedInstruction) setShowInstructionModal(true)
  }

  useEffect(() => {
    phaserGame.setUser(user)
    fetchMyUsers()
  }, [user])

  return (
    <Backdrop id='phaser-container'>
      <Connectting />
      <GameSelector playerSelector={playerSelector} />
      {showInstructionModal && (
        <FixedModalBox>
          <ModalBox>
            <Instruction setOpen={setShowInstructionModal}></Instruction>
          </ModalBox>
        </FixedModalBox>
      )}

      <LeaderboardSelector playerSelector={playerSelector} />
      <BaseModal isOpen={showCharacterSelectModal}>
        <ModalBox>
          <SelectCharacter
            setOpen={setShowCharacterSelectModal}
            onCharacterSelected={onCharacterSelected}
          />
        </ModalBox>
      </BaseModal>
      <Mobile />
      <Browser activeTab={activeTab} />
    </Backdrop>
  )
}

export default Townhall
