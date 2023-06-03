import { FunctionComponent, useEffect } from 'react'

import { useStoreState } from 'easy-peasy'
import { Outlet, useNavigate } from 'react-router-dom'

import { CommunityRoleEnum } from '@/constants/common.const'
import { RouterConst } from '@/constants/router.const'
import { CommunityStore } from '@/store/local/community'
import NewCommunityStore from '@/store/local/new-community.store'
import { GlobalStoreModel } from '@/store/store'
import { ControlPanelTab } from '@/types/community'

export const Settings: FunctionComponent = () => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const role = CommunityStore.useStoreState((action) => action.role)
  const isOwner = role === CommunityRoleEnum.OWNER

  // action
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  const navigate = useNavigate()
  useEffect(() => {
    if (!user || !isOwner) {
      navigate(RouterConst.COMMUNITIES)
      return
    }

    setActiveControlPanelTab(ControlPanelTab.SETTINGS)
  }, [setActiveControlPanelTab, user, isOwner, navigate])

  return (
    <NewCommunityStore.Provider>
      <Outlet />
    </NewCommunityStore.Provider>
  )
}
