import { FC } from 'react'

import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import tw from 'twin.macro'

import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import phaserGame from '@/townhall/engine/services/game-controller'
import Chat from '@/townhall/modules/room/chat'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

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

const Frame = styled.div<{ isMobile: boolean }>(({ isMobile }) => {
  const styles = [
    tw`
    absolute
    w-80
    bg-white
    rounded-lg
    overflow-y-scroll
`,
  ]

  if (!isMobile) {
    styles.push(tw`
      h-2/3
      right-[80px]
      w-96
    `)
  } else {
    styles.push(tw`
      bottom-[160px]
      w-5/6
      h-[500px]
    `)
  }

  return styles
})

const TabChat: FC = () => {
  // data
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)

  // action
  const toggleTab = RoomStore.useStoreActions((action) => action.toggleTab)

  const onChatClicked = () => {
    switch (activeTab) {
      case ActiveSidebarTab.NONE:
        phaserGame.deRegisterKey()
        break
      case ActiveSidebarTab.CHAT:
        phaserGame.registerKey()
        break
    }

    toggleTab(ActiveSidebarTab.CHAT)
  }

  const active = activeTab === ActiveSidebarTab.CHAT

  return (
    <>
      <Background active={active}>
        <ChatBubbleLeftIcon
          onClick={onChatClicked}
          className='cursor-pointer w-7 h-7 text-gray-900'
        />
      </Background>
      {activeTab === ActiveSidebarTab.CHAT && (
        <Frame isMobile={isMobile}>
          <Chat />
        </Frame>
      )}
    </>
  )
}

export default TabChat
