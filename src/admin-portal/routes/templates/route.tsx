import { FC, useEffect } from 'react'

import { Outlet } from 'react-router'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import AdminPortalStore from '@/store/local/admin-portal'

const Templates: FC = () => {
  const setTab = AdminPortalStore.useStoreActions((action) => action.setTab)

  useEffect(() => {
    setTab(ControlPanelTab.TEMPLATES)
  }, [])

  return <Outlet />
}

export default Templates
