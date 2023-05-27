import { CommunityStore } from '@/store/local/community'
import { ControlPanelTab } from '@/types/community'
import { FunctionComponent, useEffect } from 'react'

export const Index: FunctionComponent = () => {
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  useEffect(() => {
    setActiveControlPanelTab(ControlPanelTab.SETTINGS)
  }, [setActiveControlPanelTab])

  return <>This is settings view</>
}
