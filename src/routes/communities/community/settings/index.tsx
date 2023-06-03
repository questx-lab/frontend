import { FunctionComponent, useEffect } from 'react'

import CommunitySettings from '@/modules/community/settings'
import { CommunityStore } from '@/store/local/community'
import NewCommunityStore from '@/store/local/new-community.store'
import { ControlPanelTab } from '@/types/community'

export const Index: FunctionComponent = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const setCommunity = NewCommunityStore.useStoreActions((action) => action.setCommunity)
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  useEffect(() => {
    setCommunity(community)
  }, [community, setCommunity])

  useEffect(() => {
    setActiveControlPanelTab(ControlPanelTab.SETTINGS)
  }, [setActiveControlPanelTab])

  return <CommunitySettings />
}
