import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Tab } from '@/modules/community/control-panel/mini-widgets'
import CommunityStore from '@/store/local/community'
import { ControlPanelTab } from '@/types/community'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

const SettingsTab: FC = () => {
  // data
  const activeControlPanelTab = CommunityStore.useStoreState((state) => state.activeControlPanelTab)

  // hook
  const navigate = useNavigate()

  return (
    <Tab
      onClick={() => {
        if (activeControlPanelTab === ControlPanelTab.SETTINGS) {
          return
        }

        navigate('./settings')
      }}
      active={activeControlPanelTab === ControlPanelTab.SETTINGS}
    >
      <Cog6ToothIcon className='w-6 h-6 mr-2' />
      {'SETTINGS'}
    </Tab>
  )
}

export default SettingsTab
