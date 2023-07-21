import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import ChatStore from '@/store/chat/chat'
import { TabChatType } from '@/types/chat'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  VerticalFullWidth,
} from '@/widgets/orientation'

const ChatHeaderFrame = tw(VerticalFullWidth)`
  pt-2
  px-6
  gap-6
`

const TabFrame = tw(HorizontalFullWidth)`gap-2`

const Tab = styled.div<{ isActive: boolean }>(({ isActive }) => {
  const styles = [tw`py-[10px] px-3 text-sm rounded-full`]

  if (isActive) {
    styles.push(tw`bg-primary text-white font-medium`)
  } else {
    styles.push(tw`bg-gray-200 text-gray-900 font-normal`)
  }

  return styles
})

const Header: FC = () => {
  const tab = ChatStore.useStoreState((state) => state.selectedTab)
  const setTab = ChatStore.useStoreActions((actions) => actions.setTab)
  const currentChannel = ChatStore.useStoreState((state) => state.selectedChannel)

  const onClicked = (activeTab: TabChatType) => {
    if (tab !== activeTab) {
      setTab(activeTab)
    }
  }

  return (
    <ChatHeaderFrame>
      <HorizontalBetweenCenterFullWidth>
        <TabFrame>
          <Tab isActive={tab === TabChatType.Chat} onClick={() => onClicked(TabChatType.Chat)}>
            {'#' + currentChannel.name}
          </Tab>
          <Tab
            isActive={tab === TabChatType.CHANNEL_LIST}
            onClick={() => onClicked(TabChatType.CHANNEL_LIST)}
          >
            {TabChatType.CHANNEL_LIST}
          </Tab>
        </TabFrame>
      </HorizontalBetweenCenterFullWidth>
    </ChatHeaderFrame>
  )
}

export default Header
