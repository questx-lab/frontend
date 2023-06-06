import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Tab } from '@/modules/community/control-panel/mini-widgets'
import CommunityStore from '@/store/local/community'
import { ControlPanelTab } from '@/types/community'
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'

const ReviewSubmissionsTab: FC = () => {
  // data
  const activeControlPanelTab = CommunityStore.useStoreState((state) => state.activeControlPanelTab)

  // hook
  const navigate = useNavigate()

  return (
    <Tab
      onClick={() => {
        if (activeControlPanelTab === ControlPanelTab.REVIEW_SUBMISSION) {
          return
        }
        navigate('./review')
      }}
      active={activeControlPanelTab === ControlPanelTab.REVIEW_SUBMISSION}
    >
      <ArrowUpOnSquareIcon className='w-6 h-6 mr-2' />
      {'REVIEW SUBMISSION'}
    </Tab>
  )
}

export default ReviewSubmissionsTab
