import { FC, ReactNode } from 'react'

import { isMobile } from 'react-device-detect'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { communityRoute } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import RoomStore, { ActiveSidebarTab, ActiveSidebarTabStringMap } from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import TabChat from '@/townhall/modules/game-sidebar/tab-chat'
import TabEmoji from '@/townhall/modules/game-sidebar/tab-emoji'
import TabLuckyBox from '@/townhall/modules/game-sidebar/tab-lucky-box'
import { CircularImage } from '@/widgets/circular-image'
import { Vertical, VerticalCenter } from '@/widgets/orientation'
import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftIcon,
  Cog8ToothIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline'
import { Tooltip } from '@material-tailwind/react'

const GapVertical = styled.div<{ isMobile: boolean }>(({ isMobile }) => {
  const styles = [
    tw`
      flex
      justify-center
      items-center
      gap-3
    `,
  ]

  if (isMobile) {
    styles.push(tw`flex-row`)
  } else {
    styles.push(tw`flex-col`)
  }

  return styles
})

const Frame = tw(VerticalCenter)`
  w-full
  h-full
`

const Fixed = styled.div<{ isMobile: boolean }>(({ isMobile }) => {
  const styles = [
    tw`
      flex
      bg-white
      fixed
    `,
  ]

  if (isMobile) {
    styles.push(tw`flex-row h-16 w-full bottom-0`)
  } else {
    styles.push(tw`flex-col w-16 h-full right-0`)
  }

  return styles
})

const VerticalSidebar = styled.div<{ isMobile: boolean }>(({ isMobile }) => {
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

const Background = styled.div<{ active: boolean }>(({ active }) => {
  if (!active) {
    return tw`
      bg-white
      p-2
    `
  }

  return tw`
    bg-primary-100
    p-2
    rounded-lg
  `
})

const ItemSidebar: FC<{ tab: ActiveSidebarTab; children: ReactNode }> = ({ tab, children }) => {
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)

  return (
    <Background active={activeTab === tab}>
      <Tooltip content={ActiveSidebarTabStringMap.get(tab)} placement='right'>
        <Vertical>{children}</Vertical>
      </Tooltip>
    </Background>
  )
}

const GameSidebar: FC = () => {
  // data
  const community = RoomStore.useStoreState((state) => state.community)
  const toggleTab = RoomStore.useStoreActions((action) => action.toggleTab)
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)
  const location = useLocation()

  const onDisconnect = () => {
    phaserGame.quitGame()
    const paths = location.pathname.split('/')
    const communityHandle = paths[2]
    window.location.href = communityRoute(communityHandle)
  }

  const onClicked = (tab: ActiveSidebarTab) => {
    switch (activeTab) {
      case ActiveSidebarTab.NONE:
        phaserGame.deRegisterKey()
        break
      case ActiveSidebarTab.CHAT:
        phaserGame.registerKey()
        break
      case ActiveSidebarTab.LUCKY_BOX_SETTING:
        phaserGame.registerKey()
        break
    }
    toggleTab(tab)
  }

  return (
    <Frame>
      <Fixed isMobile={isMobile}>
        <VerticalSidebar isMobile={isMobile}>
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
            <ItemSidebar tab={ActiveSidebarTab.EMOJI}>
              <FaceSmileIcon
                onClick={() => toggleTab(ActiveSidebarTab.EMOJI)}
                className='cursor-pointer w-7 h-7 text-gray-900'
              />
            </ItemSidebar>
            <ItemSidebar tab={ActiveSidebarTab.CHAT}>
              <ChatBubbleLeftIcon
                onClick={() => onClicked(ActiveSidebarTab.CHAT)}
                className='cursor-pointer w-7 h-7 text-gray-900'
              />
            </ItemSidebar>
          </Middle>

          <GapVertical isMobile={isMobile}>
            <ItemSidebar tab={ActiveSidebarTab.LUCKY_BOX_SETTING}>
              <Cog8ToothIcon
                onClick={() => onClicked(ActiveSidebarTab.LUCKY_BOX_SETTING)}
                className='cursor-pointer w-7 h-7 text-gray-900'
              />
            </ItemSidebar>
            <ItemSidebar tab={ActiveSidebarTab.EXIT}>
              <ArrowLeftOnRectangleIcon
                onClick={onDisconnect}
                className='cursor-pointer w-7 h-7 text-gray-900'
              />
            </ItemSidebar>
          </GapVertical>
        </VerticalSidebar>
      </Fixed>
      <TabEmoji />
      <TabChat />
      <TabLuckyBox />
    </Frame>
  )
}

export default GameSidebar
