import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import RoomStore from '@/store/townhall/room'
import TabLucky from '@/townhall/components/lucky-box-setting'
import Bootstrap from '@/townhall/engine/scenes/bootstrap'
import TabChat from '@/townhall/modules/game-sidebar/tab-chat'
import TabEmoji from '@/townhall/modules/game-sidebar/tab-emoji'
import phaserGame from '@/townhall/phaser-game'
import { CircularImage } from '@/widgets/circular-image'
import { Vertical, VerticalFullWidthCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'

const Frame = tw(Vertical)`
  h-full
  p-3
`

const Middle = tw(VerticalFullWidthCenter)`
  flex-1
  gap-3
`

const GameSidebar: FC = () => {
  // data
  const community = RoomStore.useStoreState((state) => state.community)

  const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
  const navigate = useNavigate()

  const onDiconnect = () => {
    bootstrap.network.socketDisconnect()
    navigate(RouterConst.COMMUNITIES + `/${community.handle}`, {
      replace: true,
    })
    phaserGame.destroy(true, false)
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

      <Middle>
        <TabLucky />
        <TabEmoji />
        <Gap />
        <TabChat />
      </Middle>

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
