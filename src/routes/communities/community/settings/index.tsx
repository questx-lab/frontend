import { FunctionComponent, useEffect } from 'react'

import { CommunityStore } from '@/store/local/community'
import { ControlPanelTab } from '@/types/community'

export const Index: FunctionComponent = () => {
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  useEffect(() => {
    setActiveControlPanelTab(ControlPanelTab.SETTINGS)
  }, [setActiveControlPanelTab])

  return <>This is settings view</>
}
