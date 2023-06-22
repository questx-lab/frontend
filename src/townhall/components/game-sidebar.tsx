import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import Emoji from '@/townhall/components/emoji'
import Bootstrap from '@/townhall/engine/scenes/bootstrap'
import Game from '@/townhall/engine/scenes/game'
import phaserGame from '@/townhall/phaser-game'
import { CircularImage } from '@/widgets/circular-image'
import { Image } from '@/widgets/image'
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
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)

  // action
  const setActiveTab = RoomStore.useStoreActions((action) => action.setActiveTab)

  const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
  const navigate = useNavigate()

  const onDiconnect = () => {
    bootstrap.network.socketDisconnect()
    navigate(RouterConst.COMMUNITIES + `/${community.handle}`, {
      replace: true,
    })
    phaserGame.destroy(true, false)
  }

  const switchTab = (newTab: ActiveSidebarTab) => {
    if (activeTab === newTab) {
      setActiveTab(ActiveSidebarTab.NONE)
    } else {
      setActiveTab(newTab)
    }
  }

  const onChatClicked = () => {
    // TODO: Disable WASD keys when user chats
    const game = phaserGame.scene.keys.game as Game
    if (activeTab === ActiveSidebarTab.CHAT) {
      game.deregisterKeys()
    } else {
      game.registerKeys()
    }

    switchTab(ActiveSidebarTab.CHAT)
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
        <Tooltip content={'Emoji'} placement='right'>
          <Vertical>
            <Emoji onTabClicked={() => switchTab(ActiveSidebarTab.EMOJI)} />
          </Vertical>
        </Tooltip>
        <Image
          onClick={onChatClicked}
          width={30}
          height={30}
          src={
            activeTab === ActiveSidebarTab.CHAT
              ? StorageConst.CHAT_BUBBLE_ACTIVE.src
              : StorageConst.CHAT_BUBBLE.src
          }
          alt={
            activeTab === ActiveSidebarTab.CHAT
              ? StorageConst.CHAT_BUBBLE_ACTIVE.alt
              : StorageConst.CHAT_BUBBLE.alt
          }
        />
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
