import { FC } from 'react'

import { useLocation } from 'react-router-dom'
import tw from 'twin.macro'

import { communityRoute } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import RoomStore from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import TabChat from '@/townhall/modules/game-sidebar/tab-chat'
import TabEmoji from '@/townhall/modules/game-sidebar/tab-emoji'
import TabLuckyBox from '@/townhall/modules/game-sidebar/tab-lucky-box'
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

  const location = useLocation()

  const onDisconnect = () => {
    phaserGame.quitGame()
    const paths = location.pathname.split('/')
    const communityHandle = paths[2]
    window.location.href = communityRoute(communityHandle)
  }

  return (
    <Frame>
      <Tooltip content={community.display_name} placement='right'>
        <Vertical onClick={onDisconnect}>
          <CircularImage
            width={50}
            height={50}
            src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
            alt={StorageConst.COMMUNITY_DEFAULT.alt}
          />
        </Vertical>
      </Tooltip>

      <Middle>
        <TabLuckyBox />
        <TabEmoji />
        <Gap />
        <TabChat />
      </Middle>

      <Vertical>
        <Tooltip content={'Exit'} placement='right'>
          <ArrowLeftOnRectangleIcon
            onClick={onDisconnect}
            className='cursor-pointer w-7 h-7 text-gray-900'
          />
        </Tooltip>
      </Vertical>
    </Frame>
  )
}

export default GameSidebar
