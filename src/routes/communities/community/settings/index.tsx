import { FunctionComponent, useEffect } from 'react'

import CommunitySettings from '@/modules/community/settings'
import { CommunityStore } from '@/store/local/community'
import NewCommunityStore from '@/store/local/new-community.store'
import { ControlPanelTab } from '@/types/community'

export const Index: FunctionComponent = () => {
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  useEffect(() => {
    setActiveControlPanelTab(ControlPanelTab.SETTINGS)
  }, [setActiveControlPanelTab])

  return (
    <NewCommunityStore.Provider>
      <CommunitySettings />
    </NewCommunityStore.Provider>
  )
}
