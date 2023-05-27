import { CommunityStore } from '@/store/local/community'
import { ControlPanelTab } from '@/types/community'
import { FunctionComponent } from 'react'

export const Index: FunctionComponent = () => {
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  setActiveControlPanelTab(ControlPanelTab.SETTINGS)

  return <>This is settings view</>
}
