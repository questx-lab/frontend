import { FC } from 'react'

import { isMobile } from 'react-device-detect'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { communityRoute } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import RoomStore from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import TabChat from '@/townhall/modules/game-sidebar/tab-chat'
import TabEmoji from '@/townhall/modules/game-sidebar/tab-emoji'
import TabLuckyBox from '@/townhall/modules/game-sidebar/tab-lucky-box'
import { CircularImage } from '@/widgets/circular-image'
import { Vertical, VerticalCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'

const Frame = styled.div<{ isMobile: boolean }>(({ isMobile }) => {
  const styles = [
    tw`
      flex
      h-full
      p-3
    `,
  ]

  if (isMobile) {
    styles.push(tw`flex-row w-full`)
  } else {
    styles.push(tw`flex-col`)
  }

  return styles
})

const Middle = styled.div<{ isMobile: boolean }>(({ isMobile }) => {
  const styles = [
    tw`
      flex
      w-full
      gap-3
      justify-center
      items-center
    `,
  ]

  if (isMobile) {
    styles.push(tw`flex-row`)
  } else {
    styles.push(tw`flex-col h-full`)
  }

  return styles
})

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
    <Frame isMobile={isMobile}>
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

      <Middle isMobile={isMobile}>
        <TabLuckyBox />
        <TabEmoji />
        <Gap />
        <TabChat />
      </Middle>

      <VerticalCenter>
        <Tooltip content={'Exit'} placement='right'>
          <ArrowLeftOnRectangleIcon
            onClick={onDisconnect}
            className='cursor-pointer w-7 h-7 text-gray-900'
          />
        </Tooltip>
      </VerticalCenter>
    </Frame>
  )
}

export default GameSidebar
