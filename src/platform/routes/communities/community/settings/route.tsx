import { FunctionComponent, useEffect } from 'react'

import { useStoreState } from 'easy-peasy'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouterConst } from '@/constants/router.const'
import CommunityStore from '@/store/local/community'
import NewCommunityStore from '@/store/local/new-community'
import { GlobalStoreModel } from '@/store/store'
import { ControlPanelTab } from '@/types/community'

const Settings: FunctionComponent = () => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const canEdit = CommunityStore.useStoreState((action) => action.canEdit)

  // action
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  const navigate = useNavigate()
  useEffect(() => {
    if (!canEdit) {
      navigate(RouterConst.COMMUNITIES)
      return
    }

    setActiveControlPanelTab(ControlPanelTab.SETTINGS)
  }, [setActiveControlPanelTab, user, canEdit, navigate])

  return (
    <NewCommunityStore.Provider>
      <Outlet />
    </NewCommunityStore.Provider>
  )
}

export default Settings
