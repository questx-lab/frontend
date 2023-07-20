import { FC } from 'react'

import tw from 'twin.macro'

import ChatStore from '@/store/chat/chat'
import { ChannelType } from '@/types/chat'
import { Image } from '@/widgets/image'
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
  return (
    <GapHorizontal>
      <Image src={channel.avatar} width={64} height={64} />
      <GapVertical>
        <MediumTextSm>{channel.name}</MediumTextSm>
        <LightTextXs>{channel.description}</LightTextXs>
      </GapVertical>
    </GapHorizontal>
  )
}

const Channel: FC = () => {
  const channels = ChatStore.useStoreState((state) => state.channels)
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
