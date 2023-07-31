import { FC } from 'react'

import tw from 'twin.macro'

import Leaderboard from '@/modules/community/community-view/guest-or-anonymous/sidebar/leaderboard'
import LotteryEvent from '@/modules/community/community-view/guest-or-anonymous/sidebar/lottery-event'
import { Vertical } from '@/widgets/orientation'

const FixedSize = tw(Vertical)`
  w-[324px]
`

const FixedPosition = tw(Vertical)`
  fixed w-[324px]
  h-full
  overflow-y-scroll
  gap-6
  pb-[136px]
`

const CommunitySidebar: FC = () => {
  return (
    <FixedSize>
      <FixedPosition>
        <LotteryEvent />
        <Leaderboard />
      </FixedPosition>
    </FixedSize>
  )
}

export default CommunitySidebar
