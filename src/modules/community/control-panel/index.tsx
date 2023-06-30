import { FC } from 'react'

import { BrowserView } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import QuestsTab from '@/modules/community/control-panel/quests'
import ReviewSubmissionsTab from '@/modules/community/control-panel/review-submissions'
import SettingsTab from '@/modules/community/control-panel/settings'
import { CommunityType } from '@/types/community'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'

export const FixedFrame = tw.div`
  w-60
  fixed
  border-r
  border-gray-200
  h-full
  max-md:w-60
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
      <BrowserView>
        <Padding>
          <PositiveButton onClick={onNavigation} isFull type={ButtonTypeEnum.NEGATIVE}>
            {'My Townhall'}
          </PositiveButton>
        </Padding>
      </BrowserView>

      <Padding>
        <QuestsTab />
        <ReviewSubmissionsTab />
        <SettingsTab />
      </Padding>
    </FixedFrame>
  )
}

export default ControlPanel
