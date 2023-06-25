import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import StorageConst from '@/constants/storage.const'
import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import { Image } from '@/widgets/image'

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

const TabChat: FC = () => {
  // data
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)

  // action
  const toggleTab = RoomStore.useStoreActions((action) => action.toggleTab)

  const onChatClicked = () => {
    // const game = phaserGame.scene.keys.game as Game
    // switch (activeTab) {
    //   case ActiveSidebarTab.NONE:
    //     game.deregisterKeys()
    //     break
    //   case ActiveSidebarTab.CHAT:
    //     game.registerKeys()
    //     break
    // }

    toggleTab(ActiveSidebarTab.CHAT)
  }

  const active = activeTab === ActiveSidebarTab.CHAT

  return (
    <Background active={active}>
      <Image
        onClick={onChatClicked}
        width={30}
        height={30}
        src={active ? StorageConst.CHAT_BUBBLE_ACTIVE.src : StorageConst.CHAT_BUBBLE.src}
        alt={active ? StorageConst.CHAT_BUBBLE_ACTIVE.alt : StorageConst.CHAT_BUBBLE.alt}
      />
    </Background>
  )
}

export default TabChat
