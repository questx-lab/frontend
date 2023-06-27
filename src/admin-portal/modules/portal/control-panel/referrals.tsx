import { FC } from 'react'

import { useNavigate } from 'react-router'

import { AdminRoutes } from '@/admin-portal/routes/routes-navigation'
import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import { Tab } from '@/modules/community/control-panel/mini-widgets'
import AdminPortalStore from '@/store/admin/portal'

const ReferralsTab: FC = () => {
  // data
  const activeTab = AdminPortalStore.useStoreState((state) => state.activeTab)

  const navigate = useNavigate()

  return (
    <Tab
      onClick={() => {
        if (activeTab !== ControlPanelTab.REFERRALS) {
          navigate(AdminRoutes.REFERRALS)
        }
      }}
      active={activeTab === ControlPanelTab.REFERRALS}
    >
      {'Referrals'}
    </Tab>
  )
}

export default ReferralsTab
