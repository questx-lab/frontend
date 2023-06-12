import { FC, useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import AdminPortalStore from '@/store/local/admin-portal'

const Referrals: FC = () => {
  const setTab = AdminPortalStore.useStoreActions((action) => action.setTab)

  useEffect(() => {
    setTab(ControlPanelTab.REFERRALS)
  }, [])

  return <Outlet />
}

export default Referrals
