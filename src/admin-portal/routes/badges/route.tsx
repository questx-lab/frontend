import { FC, useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import AdminPortalStore from '@/store/admin/admin-portal'

const Badges: FC = () => {
  const setTab = AdminPortalStore.useStoreActions((action) => action.setTab)

  useEffect(() => {
    setTab(ControlPanelTab.BADGES)
  }, [])

  return <Outlet />
}

export default Badges
