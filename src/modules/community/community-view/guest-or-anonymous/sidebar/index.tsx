import { FC } from 'react'

import tw from 'twin.macro'

import Leaderboard from '@/modules/community/community-view/guest-or-anonymous/leaderboard'
import LotteryEvent from '@/modules/community/community-view/guest-or-anonymous/sidebar/lottery-event'
import CommunityStore from '@/store/local/community'
import { Vertical } from '@/widgets/orientation'

const FixedSize = tw(Vertical)`
  w-[384px]
  max-md:hidden
  max-md:!w-[0px]
`

const FixedPosition = tw(Vertical)`
  fixed
  w-[384px]
  gap-6
  h-[calc(100vh_-_94px)]
`

const CommunitySidebar: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  return (
    <FixedSize>
      <FixedPosition>
        <LotteryEvent />
        <Leaderboard community={community} />
      </FixedPosition>
    </FixedSize>
  )
}

export default CommunitySidebar
