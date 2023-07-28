import { FC } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { isMessagesRoute, messageRoute } from '@/constants/router.const'
import useChannels from '@/modules/chat/hooks/use-channels'
import ChatStore from '@/store/chat/chat'
import CommunityStore from '@/store/local/community'
import { ChannelType, TabChatType } from '@/types/chat'
import { CommunityType } from '@/types/community'
import { EqualBigInt } from '@/utils/number'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { LightTextXs, MediumTextSm, TextSm } from '@/widgets/text'

const Frame = tw.div`w-full h-full`

const GapVertical = tw(Vertical)`
  h-full
  w-full
  justify-center
  gap-1
`

const GapHorizontal = styled(Horizontal)<{ isActive?: boolean }>(({ isActive }) => {
  const styles = [
    tw`
      gap-3
      w-full
      items-center
      cursor-pointer
      rounded-lg
      p-3
    `,
  ]

  if (isActive) {
    styles.push(tw`bg-primary-50`)
  }

  return styles
})

const ChannelName = styled(MediumTextSm)<{ isActive?: boolean }>(({ isActive }) => {
  const styles = []
  if (isActive) {
    styles.push(tw`text-primary`)
  }

  return styles
})

export const ChannelItem: FC<{
  channel: ChannelType
  isActive: boolean
  community: CommunityType
}> = ({ channel, isActive, community }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const setChannel = ChatStore.useStoreActions((actions) => actions.setChannel)
  const setTab = ChatStore.useStoreActions((actions) => actions.setTab)

  return (
    <GapHorizontal
      onClick={() => {
        setChannel(channel)
        setTab(TabChatType.Chat)

        if (isMessagesRoute(location.pathname)) {
          navigate(messageRoute(community.handle, channel))
        }
      }}
      isActive={isActive}
    >
      <ChannelName isActive={isActive}>{'#'}</ChannelName>
      <GapVertical>
        <ChannelName isActive={isActive}>{channel.name}</ChannelName>
        <LightTextXs>{channel.description}</LightTextXs>
      </GapVertical>
    </GapHorizontal>
  )
}

const Channels: FC = () => {
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const currentChannel = ChatStore.useStoreState((state) => state.selectedChannel)
  const channels = useChannels(community.handle)

  if (channels.length === 0) {
    return (
      <Frame>
        <TextSm>{'No channels available currently'}</TextSm>
      </Frame>
    )
  }

  const renderChannels = channels.map((channel, index) => (
    <ChannelItem
      channel={channel}
      key={index}
      isActive={EqualBigInt(currentChannel.id, channel.id)}
      community={community}
    />
  ))

  return <Frame>{renderChannels}</Frame>
}

export default Channels
