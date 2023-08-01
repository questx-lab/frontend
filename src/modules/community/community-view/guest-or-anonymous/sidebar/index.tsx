import { FC } from 'react'

import tw from 'twin.macro'

import { LeaderboardType } from '@/constants/common.const'
import Leaderboard from '@/modules/community/community-view/guest-or-anonymous/leaderboard'
import LotteryEvent from '@/modules/community/community-view/guest-or-anonymous/sidebar/lottery-event'
import CommunityStore from '@/store/local/community'
import { Vertical } from '@/widgets/orientation'

const FixedSize = tw(Vertical)`
  w-[324px]
  max-sm:hidden
`

const FixedPosition = tw(Vertical)`
  fixed
  w-[320px]
  right-0
  h-full
  overflow-y-scroll
  pb-[136px]
  border-l
  border-gray-200
  border-solid
  divide-y
  divide-gray-200
`

const CommunitySidebar: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  return (
    <FixedSize>
      <FixedPosition>
        <LotteryEvent />
        <Leaderboard community={community} type={LeaderboardType.TOWNHALL} />
      </FixedPosition>
    </FixedSize>
  )
}

export default CommunitySidebar
