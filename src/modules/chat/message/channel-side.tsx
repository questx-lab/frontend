import { FC } from 'react'

import tw from 'twin.macro'

import Channels from '@/modules/chat/popover/channels'
import { Vertical } from '@/widgets/orientation'
import { TextSm } from '@/widgets/text'

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

const ChannelSide: FC = () => {
  return (
    <Frame>
      <ChannelFrame>
        <TextSm>{'CHANNELS'}</TextSm>
        <Channels />
      </ChannelFrame>
    </Frame>
  )
}

export default ChannelSide
