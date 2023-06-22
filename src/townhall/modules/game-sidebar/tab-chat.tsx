import { FC } from 'react'

import StorageConst from '@/constants/storage.const'
import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import Game from '@/townhall/engine/scenes/game'
import phaserGame from '@/townhall/phaser-game'
import { Image } from '@/widgets/image'

const TabChat: FC = () => {
  // data
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)

  // action
  const toggleTab = RoomStore.useStoreActions((action) => action.toggleTab)

  const onChatClicked = () => {
    // TODO: Disable WASD keys when user chats
    const game = phaserGame.scene.keys.game as Game
    if (activeTab === ActiveSidebarTab.CHAT) {
      game.deregisterKeys()
    } else {
      game.registerKeys()
    }

    toggleTab(ActiveSidebarTab.CHAT)
  }

  return (
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
  )
}

export default TabChat
