import { FC } from 'react'

import tw from 'twin.macro'

import LeaderboardTab from '@/modules/community/control-panel/leaderboard'
import LotteryTab from '@/modules/community/control-panel/lottery'
import NFTTab from '@/modules/community/control-panel/nfts'
import QuestsTab from '@/modules/community/control-panel/quests'
import ReviewSubmissionsTab from '@/modules/community/control-panel/review-submissions'
import SettingsTab from '@/modules/community/control-panel/settings'

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
  show: boolean
}> = ({ show }) => {
  if (!show) {
    return <></>
  }

  return (
    <FixedFrame>
      <Padding>
        <QuestsTab />
        <ReviewSubmissionsTab />
        <LeaderboardTab />
        <LotteryTab />
        <NFTTab />
        <SettingsTab />
      </Padding>
    </FixedFrame>
  )
}

export default ControlPanel
