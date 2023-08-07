import { FC } from 'react'

import { BrowserView } from 'react-device-detect'
import tw from 'twin.macro'

import Channels from '@/modules/chat/channel/channels'
import { Vertical } from '@/widgets/orientation'
import { MediumTextXl } from '@/widgets/text'

const Frame = tw(Vertical)`
  w-[360px]
  fixed
  p-6
  border-r
  border-gray-200
  border-solid
  left-0
  h-full
  overflow-y-scroll
  gap-3
`

const ChannelFrame = tw(Vertical)`
  w-full
  h-full
  gap-3
`

export const ChannelSide: FC = () => {
  return (
    <ChannelFrame>
      <MediumTextXl>{'CHAT'}</MediumTextXl>
      <Channels />
    </ChannelFrame>
  )
}

const FixChannelSide: FC = () => {
  return (
    <BrowserView>
      <Frame>
        <ChannelSide />
      </Frame>
    </BrowserView>
  )
}

export default FixChannelSide
