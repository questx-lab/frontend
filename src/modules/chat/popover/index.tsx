import { FC, useEffect } from 'react'

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
import { ChatMessageType, TabChatType } from '@/types/chat'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { PopPanel, PopPover } from '@/widgets/popover'
import { TextSm, TextXl } from '@/widgets/text'
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Relative } from '@/widgets/simple-popup'
import chatController from '@/modules/chat/services/chat-controller'

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

const FixedWidthPopPanel = tw(PopPanel)`
  w-[480px]
  mt-3
  right-0
  max-sm:w-[300px]
  max-sm:right--6
`

const Absolute = tw.div`absolute right-0 bottom-0 bg-white rounded-full`

const CircleRedBox = tw.div`w-2.5 h-2.5 rounded-full bg-danger`

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

const ChatBubbleIcon: FC<{ hasDot: boolean }> = ({ hasDot }) => {
  if (hasDot)
    return (
      <Relative>
        <ChatBubbleLeftIcon className='w-5 h-5 text-gray-900' />
        <Absolute>
          <CircleRedBox />
        </Absolute>
      </Relative>
    )
  return <ChatBubbleLeftIcon className='w-5 h-5 text-gray-900' />
}

const ChatPopover: FC = () => {
  const { communityHandle } = useParams()

  const currentChannel = ChatStore.useStoreState((state) => state.selectedChannel)

  // data
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const channels = useChannels(community.handle)
  const channelNewMessageStatus = ChatStore.useStoreState((state) => state.channelNewMessageStatus)
  const setChannelNewMessageStatus = ChatStore.useStoreActions(
    (action) => action.setChannelNewMessageStatus
  )

  // actions

  const navigate = useNavigate()

  const onNavigate = () => {
    navigate(messageRoute(community.handle, channels[0]))
  }

  useEffect(() => {
    const listener = {
      onNewMessages: (channelId: bigint, messages: ChatMessageType[]) => {
        setChannelNewMessageStatus({
          channelId: channelId,
          status: true,
        })
      },
    }

    chatController.addNewMessageListener(listener)

    return () => {
      chatController.removeNewMessageListener(listener)
    }
  }, [currentChannel])

  if (!communityHandle) {
    return <></>
  }

  const showNewMessage = channelNewMessageStatus.some((status) => status.status === true)

  return (
    <PopPover button={<ChatBubbleIcon hasDot={showNewMessage} />} custom>
      <FixedWidthPopPanel>
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
      </FixedWidthPopPanel>
    </PopPover>
  )
}

export default ChatPopover
