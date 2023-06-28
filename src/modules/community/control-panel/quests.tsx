import { FC } from 'react'

import { useStoreActions } from 'easy-peasy'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

import { RouterConst } from '@/constants/router.const'
import { Tab } from '@/modules/community/control-panel/mini-widgets'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { ControlPanelTab } from '@/types/community'
import { BoltIcon } from '@heroicons/react/24/outline'

const QuestsTab: FC = () => {
  // data
  const activeControlPanelTab = CommunityStore.useStoreState((state) => state.activeControlPanelTab)
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // action
  const setShowNavigationDrawer = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowNavigationDrawer
  )

  // hook
  const navigate = useNavigate()

  return (
    <Tab
      onClick={() => {
        if (isMobile) {
          setShowNavigationDrawer(false)
        }

        if (activeControlPanelTab === ControlPanelTab.QUESTS) {
          return
        }

        navigate(RouterConst.COMMUNITIES + `/${community.handle}`)
      }}
      active={activeControlPanelTab === ControlPanelTab.QUESTS}
    >
      <BoltIcon className='w-6 h-6 mr-2' />
      {'QUESTS'}
    </Tab>
  )
}

export default QuestsTab
