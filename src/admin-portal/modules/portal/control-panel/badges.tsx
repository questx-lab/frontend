import { FC } from 'react'

import { useNavigate } from 'react-router'

import { AdminRoutes } from '@/admin-portal/routes/routes-navigation'
import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import { Tab } from '@/modules/community/control-panel/mini-widgets'
import AdminPortalStore from '@/store/admin/admin-portal'

const BadgesTab: FC = () => {
  // data
  const activeTab = AdminPortalStore.useStoreState((state) => state.activeTab)

  const navigate = useNavigate()

  return (
    <Tab
      onClick={() => {
        if (activeTab !== ControlPanelTab.BADGES) {
          navigate(AdminRoutes.BADGES)
        }
      }}
      active={activeTab === ControlPanelTab.BADGES}
    >
      {'Badges'}
    </Tab>
  )
}

export default BadgesTab
