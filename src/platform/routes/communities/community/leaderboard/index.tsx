import { FC, useEffect } from 'react'

import tw from 'twin.macro'

import { LeaderboardType } from '@/constants/common.const'
import Leaderboard from '@/modules/community/community-view/guest-or-anonymous/leaderboard'
import CommunityStore from '@/store/local/community'
import { ControlPanelTab } from '@/types/community'
import { Vertical, VerticalFullWidthCenter } from '@/widgets/orientation'
import { Text2xl } from '@/widgets/text'

const Frame = tw(VerticalFullWidthCenter)`py-6`

const FixedWidth = tw(Vertical)`w-[680px]  h-[calc(100vh_-_128px)] gap-6`

const Header = tw(Text2xl)`
  w-full
  font-medium
`

const Index: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  useEffect(() => {
    setActiveControlPanelTab(ControlPanelTab.LEADERBOARD)
  }, [setActiveControlPanelTab])

  return (
    <Frame>
      <FixedWidth>
        <Header>{'Leaderboard'}</Header>
        <Leaderboard type={LeaderboardType.PLATFORM} community={community} />
      </FixedWidth>
    </Frame>
  )
}

export default Index
