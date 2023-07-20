import { FC, useEffect } from 'react'

import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { RouterConst } from '@/constants/router.const'
import ChatBox from '@/modules/chat/chat-box'
import useChannels from '@/modules/chat/hooks/use-channels'
import AskToFollow from '@/modules/chat/popover/ask-to-follow'
import Channels from '@/modules/chat/popover/channels'
import Header from '@/modules/chat/popover/header'
import chatController from '@/modules/chat/services/chat-controller'
import ChatStore from '@/store/chat/chat'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { TabChatType } from '@/types/chat'
import { FollowCommunityType } from '@/types/community'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { PopPover } from '@/widgets/popover'
import { TextSm, TextXl } from '@/widgets/text'
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'

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

const ContentTab: FC = () => {
  const tab = ChatStore.useStoreState((state) => state.selectedTab)
  if (tab === TabChatType.CHANNEL_LIST) {
    return (
      <Padding6>
        <Channels />
      </Padding6>
    )
  }

  return <ChatBox />
}

const PopPoverContent: FC = () => {
  // data
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const communitiesFollowing: FollowCommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesFollowing
  )
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const channels = useChannels(community.handle)
  const currentChannel = ChatStore.useStoreState((state) => state.selectedChannel)

  // actions
  const setCurrentChannel = ChatStore.useStoreActions((action) => action.setChannel)
  const setShowChatPopover = ChatStore.useStoreActions((action) => action.setShowChatPopover)

  // Check if user follows this community. If not, ask them to join the community.
  const didFollowCommunity =
    communitiesFollowing &&
    communitiesFollowing.some((follow) => follow.community.handle === community.handle)

  const navigate = useNavigate()
  const onNavigate = () => {
    setShowChatPopover(false)
    navigate(RouterConst.MESSAGES)
  }

  useEffect(() => {
    // get Channels
    if (user && community.handle) {
      chatController.loadChannels(community.handle)
    }
  }, [user, community.handle])

  // Set a default channel if it is not defined
  useEffect(() => {
    if (currentChannel.id === BigInt(0) && channels.length > 0) {
      setCurrentChannel(channels[0])
    }
  }, [currentChannel.id, channels, setCurrentChannel])

  if (!community) {
    return <></>
  }

  if (!didFollowCommunity) {
    return <AskToFollow />
  }

  return (
    <>
      <Header />
      <Content>
        <ContentTab />
      </Content>
      <FootFrame>
        <PrimaryText onClick={onNavigate}>{'See all in chat room'}</PrimaryText>
      </FootFrame>
    </>
  )
}

const ChatPopover: FC = () => {
  // data
  const showChatPopover = ChatStore.useStoreState((state) => state.showChatPopover)

  // actions
  const setShowChatPopover = ChatStore.useStoreActions((action) => action.setShowChatPopover)

  const onChangePoppover = () => {
    setShowChatPopover(!showChatPopover)
  }

  return (
    <PopPover
      button={<ChatBubbleLeftIcon onClick={onChangePoppover} className='w-5 h-5 text-gray-900' />}
      styled='w-[480px] mt-3 right-0'
      visible={showChatPopover}
    >
      <Frame>
        <GapPaddingx>
          <HorizontalBetweenCenterFullWidth>
            <TextXl>{'Chat'}</TextXl>
            <XMarkIcon
              className='w-6 h-6 text-gray-900'
              onClick={() => setShowChatPopover(false)}
            />
          </HorizontalBetweenCenterFullWidth>
        </GapPaddingx>
        <PopPoverContent />
      </Frame>
    </PopPover>
  )
}

export default ChatPopover
