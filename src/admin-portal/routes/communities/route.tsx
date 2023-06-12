import { FC, useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import AdminPortalStore from '@/store/local/admin-portal'

const Communities: FC = () => {
  const setTab = AdminPortalStore.useStoreActions((action) => action.setTab)

  useEffect(() => {
    setTab(ControlPanelTab.COMMUNITIES)
  }, [])

  return <Outlet />
}

export default Communities