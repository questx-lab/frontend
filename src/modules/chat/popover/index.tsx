import { FC } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { messageRoute } from '@/constants/router.const'
import Index from '@/modules/chat'
import Channels from '@/modules/chat/channel/channels'
import ChatBox from '@/modules/chat/chat-box'
import useChannels from '@/modules/chat/hooks/use-channels'
import Header from '@/modules/chat/popover/header'
import ChatStore from '@/store/chat/chat'
import CommunityStore from '@/store/local/community'
import { TabChatType } from '@/types/chat'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { PopPanel, PopPover } from '@/widgets/popover'
import { TextSm, TextXl } from '@/widgets/text'
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Frame = tw(VerticalFullWidth)`
  h-[calc(100vh_-_100px)]
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

const ChatPopover: FC = () => {
  const { communityHandle } = useParams()

  // data
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const channels = useChannels(community.handle)

  // actions

  const navigate = useNavigate()

  const onNavigate = () => {
    navigate(messageRoute(community.handle, channels[0]))
  }

  if (!communityHandle) {
    return <></>
  }

  return (
    <PopPover button={<ChatBubbleLeftIcon className='w-5 h-5 text-gray-900' />} custom>
      <PopPanel className={'w-[480px] mt-3 right-0'}>
        {({ close }) => (
          <Frame>
            <GapPaddingx>
              <HorizontalBetweenCenterFullWidth>
                <TextXl>{'Chat'}</TextXl>
                <XMarkIcon className='w-6 h-6 text-gray-900' onClick={() => close()} />
              </HorizontalBetweenCenterFullWidth>
            </GapPaddingx>

            <Index
              children={
                <>
                  <Header />
                  <Content>
                    <ContentTab />
                  </Content>
                </>
              }
            />
            <FootFrame>
              <PrimaryText
                onClick={() => {
                  onNavigate()
                  close()
                }}
              >
                {'See all in chat room'}
              </PrimaryText>
            </FootFrame>
          </Frame>
        )}
      </PopPanel>
    </PopPover>
  )
}

export default ChatPopover
