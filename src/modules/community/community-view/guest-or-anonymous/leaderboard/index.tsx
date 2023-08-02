import { FC, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { LeaderboardRangeEnum, LeaderboardType } from '@/constants/common.const'
import RenderLeaderboard from '@/modules/community/community-view/guest-or-anonymous/leaderboard/leaderboard-list'
import { CommunityType } from '@/types/community'
import { HorizontalCenter } from '@/widgets/orientation'

const Content = styled.div<{ type: LeaderboardType }>(({ type }) => {
  const styles = []
  if (type === LeaderboardType.TOWNHALL) {
    styles.push(tw`h-full w-full`)
  } else {
    styles.push(tw`
      flex
      flex-col
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
  `)
  }

  return styles
})

const FixedHeightHorizontal = tw(HorizontalCenter)`
  h-[64px]
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
const Leaderboard: FC<{ community: CommunityType; type?: LeaderboardType }> = ({
  community,
  type = LeaderboardType.PLATFORM,
}) => {
  // hook
  const [tab, setTab] = useState<LeaderboardRangeEnum>(LeaderboardRangeEnum.WEEK)

  return (
    <Content type={type}>
      <FixedHeightHorizontal>
        <TabBox
          onClick={() => setTab(LeaderboardRangeEnum.WEEK)}
          selected={tab === LeaderboardRangeEnum.WEEK}
        >
          {LeaderboardRangeEnum.WEEK}
        </TabBox>
        <TabBox
          onClick={() => setTab(LeaderboardRangeEnum.MONTH)}
          selected={tab === LeaderboardRangeEnum.MONTH}
        >
          {LeaderboardRangeEnum.MONTH}
        </TabBox>
      </FixedHeightHorizontal>
      <OverflowScroll>
        <RenderLeaderboard community={community} range={tab} />
      </OverflowScroll>
    </Content>
  )
}

export default Leaderboard
