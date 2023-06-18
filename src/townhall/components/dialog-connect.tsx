import { FC, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { GlobalStoreModel } from '@/store/store'
import RoomStore from '@/store/townhall/room'
import phaserGame from '@/townhall/phaser-game'
import Bootstrap from '@/townhall/scenes/bootstrap'
import Game from '@/townhall/scenes/game'
import { UserType } from '@/types'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import { VerticalFullWidth } from '@/widgets/orientation'
import { TextXl } from '@/widgets/text'

export const Content = tw(VerticalFullWidth)`
  w-full
  h-full
  gap-4
  p-4
`

const DialogConnect: FC<{ showDialog: boolean; onCloseShowDialog: () => void }> = ({
  showDialog,
  onCloseShowDialog,
}) => {
  const [showModal, setShowModal] = useState<boolean>(true)
  const setRoomJoined = RoomStore.useStoreActions((action) => action.setRoomJoined)
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const game = phaserGame.scene.keys.game as Game

  const onAction = () => {
    setRoomJoined(true)
    handleConnect()
  }

  useEffect(() => {
    console.log(game.myPlayer)
  }, [game.myPlayer])

  const handleConnect = async () => {
    // TODO: hard connection
    const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
    console.log('====here to conect====')
    bootstrap.launchGame()
    setTimeout(async () => {
      await bootstrap.network.jointoMap(user)
    }, 1000)
    game.registerKeys()
  }

  return (
    <BasicModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      styled={'flex flex-col !justify-start !items-start !w-[400px] !h-[180px]'}
    >
      <Content>
        <TextXl>{`Welcome To Townhall`}</TextXl>
        <PositiveButton isFull onClick={onAction} type={ButtonTypeEnum.POSITVE}>
          {'Connect'}
        </PositiveButton>
      </Content>
    </BasicModal>
  )
}

export default DialogConnect
