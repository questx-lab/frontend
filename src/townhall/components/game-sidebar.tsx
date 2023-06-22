import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import RoomStore from '@/store/townhall/room'
import Bootstrap from '@/townhall/engine/scenes/bootstrap'
import Game from '@/townhall/engine/scenes/game'
import phaserGame from '@/townhall/phaser-game'
import { CircularImage } from '@/widgets/circular-image'
import { Vertical, VerticalFullWidthCenter } from '@/widgets/orientation'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'

const Frame = tw(Vertical)`
  h-full
  p-3
`

const Middle = tw(VerticalFullWidthCenter)`
  flex-1
`

const GameSidebar: FC = () => {
  // data
  const community = RoomStore.useStoreState((state) => state.community)
  const showChat = RoomStore.useStoreState((state) => state.showChat)

  // action
  const setShowChat = RoomStore.useStoreActions((action) => action.setShowChat)

  const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
  const navigate = useNavigate()

  const onDiconnect = () => {
    bootstrap.network.socketDisconnect()
    navigate(RouterConst.COMMUNITIES + `/${community.handle}`, {
      replace: true,
    })
    phaserGame.destroy(true, false)
  }

  const onChatClicked = () => {
    // TODO: Disable WASD keys when user chats
    const game = phaserGame.scene.keys.game as Game
    if (showChat) {
      game.deregisterKeys()
    } else {
      game.registerKeys()
    }

    setShowChat(!showChat)
  }

  return (
    <Frame>
      <Tooltip content={community.display_name} placement='right'>
        <Vertical onClick={onDiconnect}>
          <CircularImage
            width={50}
            height={50}
            src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
            alt={StorageConst.COMMUNITY_DEFAULT.alt}
          />
        </Vertical>
      </Tooltip>

      <Middle onClick={onChatClicked}>Chat</Middle>

      <Vertical>
        <Tooltip content={'Exit'} placement='right'>
          <ArrowLeftOnRectangleIcon
            onClick={onDiconnect}
            className='cursor-pointer w-7 h-7 text-gray-900'
          />
        </Tooltip>
      </Vertical>
    </Frame>
  )
}

export default GameSidebar
