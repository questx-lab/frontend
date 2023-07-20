import { FC, useEffect } from 'react'

import tw from 'twin.macro'

import { LeaderboardType } from '@/constants/common.const'
import Leaderboard from '@/modules/community/community-view/guest-or-anonymous/leaderboard'
import CommunityStore from '@/store/local/community'
import { ControlPanelTab } from '@/types/community'
import { VerticalFullWidthCenter } from '@/widgets/orientation'
import { Text2xl } from '@/widgets/text'

const FixedWidth = tw.div`w-[980px]`

const Head = tw(Text2xl)`
  w-full
  py-5
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
    <VerticalFullWidthCenter>
      <FixedWidth>
        <Head>{'Leaderboard'}</Head>
      </FixedWidth>
      <FixedWidth>
        <Leaderboard type={LeaderboardType.TOWNHALL} community={community} />
      </FixedWidth>
    </VerticalFullWidthCenter>
  )
}

export default Index
