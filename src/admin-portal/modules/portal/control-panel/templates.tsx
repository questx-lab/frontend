import { FC } from 'react'

import { useNavigate } from 'react-router'

import { AdminRoutes } from '@/admin-portal/routes/routes-navigation'
import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import { Tab } from '@/modules/community/control-panel/mini-widgets'
import AdminPortalStore from '@/store/admin/portal'

const TemplatesTab: FC = () => {
  // data
  const activeTab = AdminPortalStore.useStoreState((state) => state.activeTab)

  const navigate = useNavigate()

  return (
    <Tab
      onClick={() => {
        if (activeTab !== ControlPanelTab.TEMPLATES) {
          navigate(AdminRoutes.TEMPLATES)
        }
      }}
      active={activeTab === ControlPanelTab.TEMPLATES}
    >
      {'Templates'}
    </Tab>
  )
}

export default TemplatesTab
