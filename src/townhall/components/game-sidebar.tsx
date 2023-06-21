import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import RoomStore from '@/store/townhall/room'
import Emoji from '@/townhall/components/emoji'
import Bootstrap from '@/townhall/engine/scenes/bootstrap'
import phaserGame from '@/townhall/phaser-game'
import { CircularImage } from '@/widgets/circular-image'
import { Vertical, VerticalFullWidthHeight } from '@/widgets/orientation'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'

const Frame = tw(Vertical)`
  w-[64px]
  h-full
  bg-white
  p-3
  right-0
  fixed
`

const CenterVertical = tw(VerticalFullWidthHeight)`
  justify-center
  items-center
`

const GameSidebar: FC = () => {
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
      <CenterVertical>
        <Tooltip content={'Emoji'} placement='right'>
          <Vertical>
            <Emoji />
          </Vertical>
        </Tooltip>
      </CenterVertical>
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
