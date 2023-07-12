import { FC } from 'react'

import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import tw from 'twin.macro'

import RoomStore, { ActiveSidebarTab } from '@/store/townhall/room'
import Chat from '@/townhall/modules/room/chat'

const Frame = styled.div<{ isMobile: boolean }>(({ isMobile }) => {
  const styles = [
    tw`
    absolute
    bg-white
    overflow-y-scroll
    border
    border-gray-200
    border-r
`,
  ]

  if (!isMobile) {
    styles.push(tw`
      h-full
      right-[64px]
      w-[320px]
    `)
  } else {
    styles.push(tw`
      bottom-[160px]
      w-5/6
      h-[500px]
      rounded-lg
    `)
  }

  return styles
})

const TabChat: FC = () => {
  // data
  const activeTab = RoomStore.useStoreState((state) => state.activeTab)

  if (activeTab !== ActiveSidebarTab.CHAT) {
    return <></>
  }

  return (
    <Frame isMobile={isMobile}>
      <Chat />
    </Frame>
  )
}

export default TabChat
