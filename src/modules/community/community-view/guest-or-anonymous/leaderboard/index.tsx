import { FC, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { LeaderboardRangeEnum } from '@/constants/common.const'
import LeaderboardList from '@/modules/community/community-view/guest-or-anonymous/leaderboard/leaderboard-list'
import { CommunityType } from '@/types/community'
import { HorizontalCenter, Vertical } from '@/widgets/orientation'

const Content = tw(Vertical)`
  w-full
  h-full
  right-0
  border
  border-solid
  border-gray-200
  bg-white
  max-md:hidden
  rounded-lg
  overflow-y-scroll
`

const FixedHeightHorizontal = tw(HorizontalCenter)`
  h-[64px]
  w-full
`

const TabDivider = tw.div`
  bg-gray-200
  w-[3px]
  h-full
`

const TabBox = styled(HorizontalFullWidthCenter)<{ selected: boolean }>(({ selected }) => {
  const styles = [tw`h-full font-medium w-full text-sm outline-0 ring-0 cursor-pointer`]
  if (selected) {
    styles.push(tw`text-primary-500 bg-white`)
  } else {
    styles.push(tw`text-gray-700 bg-gray-100`)
  }

  return styles
})

const OverflowScroll = tw.div`
  w-full
  h-full
  overflow-y-scroll
  p-4
`
// TODO: UI change, refactor leaderboard after
const Leaderboard: FC<{ community: CommunityType }> = ({ community }) => {
  // hook
  const [tab, setTab] = useState<LeaderboardRangeEnum>(LeaderboardRangeEnum.WEEK)

  return (
    <Content>
      <FixedHeightHorizontal>
        <TabBox
          onClick={() => setTab(LeaderboardRangeEnum.WEEK)}
          selected={tab === LeaderboardRangeEnum.WEEK}
        >
          {LeaderboardRangeEnum.WEEK}
        </TabBox>
        <TabDivider />
        <TabBox
          onClick={() => setTab(LeaderboardRangeEnum.MONTH)}
          selected={tab === LeaderboardRangeEnum.MONTH}
        >
          {LeaderboardRangeEnum.MONTH}
        </TabBox>
        <TabDivider />
        <TabBox
          onClick={() => setTab(LeaderboardRangeEnum.ALL)}
          selected={tab === LeaderboardRangeEnum.ALL}
        >
          {LeaderboardRangeEnum.ALL}
        </TabBox>
      </FixedHeightHorizontal>
      <OverflowScroll>
        <LeaderboardList community={community} range={tab} />
      </OverflowScroll>
    </Content>
  )
}

export default Leaderboard
