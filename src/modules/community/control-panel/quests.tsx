import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Tab } from '@/modules/community/control-panel/mini-widgets'
import CommunityStore from '@/store/local/community'
import { ControlPanelTab } from '@/types/community'
import { BoltIcon } from '@heroicons/react/24/outline'

const QuestsTab: FC = () => {
  // data
  const activeControlPanelTab = CommunityStore.useStoreState((state) => state.activeControlPanelTab)

  // hook
  const navigate = useNavigate()

  return (
    <Tab
      onClick={() => {
        if (activeControlPanelTab === ControlPanelTab.QUESTS) {
          return
        }

        navigate('./')
      }}
      active={activeControlPanelTab === ControlPanelTab.QUESTS}
    >
      <BoltIcon className='w-6 h-6 mr-2' />
      {'QUESTS'}
    </Tab>
  )
}

export default QuestsTab
