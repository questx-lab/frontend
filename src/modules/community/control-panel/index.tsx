import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import LeaderboardTab from '@/modules/community/control-panel/leaderboard'
import LotteryTab from '@/modules/community/control-panel/lottery'
import QuestsTab from '@/modules/community/control-panel/quests'
import ReviewSubmissionsTab from '@/modules/community/control-panel/review-submissions'
import SettingsTab from '@/modules/community/control-panel/settings'
import { CommunityType } from '@/types/community'

export const FixedFrame = tw.div`
  w-60
  fixed
  border-r-2
  border-gray-200
  h-full
  max-md:w-60
  bg-white
`

const Padding = tw.div`
  px-4
  pt-6
`

const ControlPanel: FC<{
  community: CommunityType
  show: boolean
}> = ({ community, show }) => {
  const navigate = useNavigate()

  if (!show) {
    return <></>
  }

  const onNavigation = () => {
    navigate(RouterConst.TOWNHALL + `/${community.handle}`)
  }

  return (
    <FixedFrame>
      <Padding>
        <QuestsTab />
        <ReviewSubmissionsTab />
        <LeaderboardTab />
        <LotteryTab />
        <SettingsTab />
      </Padding>
    </FixedFrame>
  )
}

export default ControlPanel
