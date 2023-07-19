import { FC, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { getChannelsApi } from '@/api/chat'
import { RouterConst } from '@/constants/router.const'
import ChatBox from '@/modules/chat/chat-box'
import Channel from '@/modules/chat/popover/channel'
import ChatStore from '@/store/chat/chat'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { PopPover } from '@/widgets/popover'
import { TextSm, TextXl } from '@/widgets/text'
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'

enum TabChatType {
  GENERAL = '#General',
  CHANNELS = '#Channels',
}

const Frame = tw(VerticalFullWidth)`
  h-[800px]
  py-6
`

const GapPaddingx = tw(VerticalFullWidth)`
  px-6
  gap-6
`

const Padding6 = tw.div`
  p-6
`

const TabFrame = tw(HorizontalFullWidth)`gap-2`

const Content = tw.div`
  h-full
  w-full
  overflow-y-scroll
`

const FootFrame = tw(HorizontalFullWidthCenter)`
  border-t
  border-solid
  border-gray-200
  pt-6
  px-6
  justify-center
`

const PrimaryText = tw(TextSm)`text-primary font-medium`

const Tab = styled.div<{ isActive: boolean }>(({ isActive }) => {
  const styles = [tw`py-[10px] px-3 text-sm rounded-full`]

  if (isActive) {
    styles.push(tw`bg-primary text-white font-medium`)
  } else {
    styles.push(tw`bg-gray-200 text-gray-900 font-normal`)
  }

  return styles
})

const ChatTab: FC<{ tab: TabChatType; onTabChange: (value: TabChatType) => void }> = ({
  tab,
  onTabChange,
}) => {
  const onClicked = (activeTab: TabChatType) => {
    if (tab !== activeTab) {
      onTabChange(activeTab)
    }
  }

  return (
    <TabFrame>
      <Tab isActive={tab === TabChatType.GENERAL} onClick={() => onClicked(TabChatType.GENERAL)}>
        {TabChatType.GENERAL}
      </Tab>
      <Tab isActive={tab === TabChatType.CHANNELS} onClick={() => onClicked(TabChatType.CHANNELS)}>
        {TabChatType.CHANNELS}
      </Tab>
    </TabFrame>
  )
}

const ContentTab: FC<{ tab: TabChatType }> = ({ tab }) => {
  if (tab === TabChatType.CHANNELS) {
    return (
      <Padding6>
        <Channel />
      </Padding6>
    )
  }

  // TODO: Chat view
  return <ChatBox />
}

const ChatPopover: FC = () => {
  // data
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  // actions
  const setCommunity = ChatStore.useStoreActions((action) => action.setCommunity)
  const setChannels = ChatStore.useStoreActions((action) => action.setChannels)

  const [visible, setVisible] = useState<boolean>()
  const [tab, setTab] = useState<TabChatType>(TabChatType.GENERAL)
  const navigate = useNavigate()

  const onTabChange = (tab: TabChatType) => {
    setTab(tab)
  }

  const onNavigate = () => {
    onChangePoppover()
    navigate(RouterConst.MESSAGES)
  }

  const onChangePoppover = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    // get Channels
    if (user && community.handle) {
      setCommunity(community)
      fetchChannels()
    }
  }, [user, community.handle])

  const fetchChannels = async () => {
    const response = await getChannelsApi(community.handle)
    if (response.data) {
      setChannels(response.data.channels)
    }
  }

  if (!community) {
    return <></>
  }

  return (
    <PopPover
      button={<ChatBubbleLeftIcon onClick={onChangePoppover} className='w-5 h-5 text-gray-900' />}
      styled='w-[480px] mt-3 right-0'
      visible={visible}
    >
      <Frame>
        <GapPaddingx>
          <HorizontalBetweenCenterFullWidth>
            <TextXl>{'Chat'}</TextXl>
            <XMarkIcon className='w-6 h-6 text-gray-900' onClick={onChangePoppover} />
          </HorizontalBetweenCenterFullWidth>
          <ChatTab tab={tab} onTabChange={onTabChange} />
        </GapPaddingx>
        <Content>
          <ContentTab tab={tab} />
        </Content>
        <FootFrame>
          <PrimaryText onClick={onNavigate}>{'See all in chat room'}</PrimaryText>
        </FootFrame>
      </Frame>
    </PopPover>
  )
}

export default ChatPopover
