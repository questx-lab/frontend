import { FC } from 'react'

import tw from 'twin.macro'

import useChannels from '@/modules/chat/hooks/use-channels'
import ChatStore from '@/store/chat/chat'
import CommunityStore from '@/store/local/community'
import { ChannelType, TabChatType } from '@/types/chat'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { LightTextXs, MediumTextSm, TextSm } from '@/widgets/text'

const Frame = tw.div`w-full h-full`

const GapVertical = tw(Vertical)`
  h-full
  w-full
  justify-center
  gap-1
`

const GapHorizontal = tw(Horizontal)`
  gap-3
  w-full
  items-center
  cursor-pointer
`

export const ChannelItem: FC<{ channel: ChannelType }> = ({ channel }) => {
  const setChannel = ChatStore.useStoreActions((actions) => actions.setChannel)
  const setTab = ChatStore.useStoreActions((actions) => actions.setTab)

  return (
    <GapHorizontal
      onClick={() => {
        setChannel(channel)
        setTab(TabChatType.Chat)
      }}
    >
      {'#'}
      <GapVertical>
        <MediumTextSm>{channel.name}</MediumTextSm>
        <LightTextXs>{channel.description}</LightTextXs>
      </GapVertical>
    </GapHorizontal>
  )
}

const Channel: FC = () => {
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const channels = useChannels(community.handle)
  if (channels.length === 0) {
    return (
      <Frame>
        <TextSm>{'No channels available currently'}</TextSm>
      </Frame>
    )
  }

  const renderChannels = channels.map((channel, index) => (
    <ChannelItem channel={channel} key={index} />
  ))

  return <Frame>{renderChannels}</Frame>
}

export default Channel
