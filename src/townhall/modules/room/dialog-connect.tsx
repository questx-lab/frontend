import { FC, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import { GlobalStoreModel } from '@/store/store'
import RoomStore from '@/store/townhall/room'
import Bootstrap from '@/townhall/engine/scenes/bootstrap'
import Game from '@/townhall/engine/scenes/game'
import phaserGame from '@/townhall/phaser-game'
import { UserType } from '@/types'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import { CircularImage } from '@/widgets/circular-image'
import BasicModal from '@/widgets/modal/basic'
import { HorizontalCenter, VerticalFullWidth } from '@/widgets/orientation'
import { TextXl } from '@/widgets/text'

const Content = tw(VerticalFullWidth)`
  w-full
  h-full
  gap-4
  p-4
`

const FullWidthCenter = tw(HorizontalCenter)`
  w-full
`

const DialogConnect: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(true)
  const game = phaserGame.scene.keys.game as Game

  // data
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const community = RoomStore.useStoreState((state) => state.community)
  const gameRooms = RoomStore.useStoreState((state) => state.gameRooms)

  // action
  const setRoomJoined = RoomStore.useStoreActions((action) => action.setRoomJoined)

  const onAction = () => {
    setRoomJoined(true)
    handleConnect()
  }

  const handleConnect = async () => {
    const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
    bootstrap.launchGame()

    // TODO: hardcode get first room
    const roomId = gameRooms.length > 0 ? gameRooms[0].id : ''

    // wait for phaser to create the game
    setTimeout(async () => {
      await bootstrap.network.jointoMap(user, roomId)
      game.registerKeys()
    }, 1000)
  }

  return (
    <BasicModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      styled={'flex flex-col !justify-start !items-start !w-[400px] !h-[250px]'}
    >
      <Content>
        <FullWidthCenter>
          <CircularImage
            width={80}
            height={80}
            src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
            alt={StorageConst.COMMUNITY_DEFAULT.alt}
          />
          <TextXl>{`Welcome To ${community.display_name}`}</TextXl>
        </FullWidthCenter>
        <PositiveButton isFull onClick={onAction} type={ButtonTypeEnum.POSITVE}>
          {'Connect'}
        </PositiveButton>
      </Content>
    </BasicModal>
  )
}

export default DialogConnect
