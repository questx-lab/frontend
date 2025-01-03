import { FC, useEffect } from 'react'

import CommunitySettings from '@/modules/community/settings'
import CommunityStore from '@/store/local/community'
import NewCommunityStore from '@/store/local/new-community'
import { ControlPanelTab } from '@/types/community'

const Index: FC = () => {
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

export default Index
