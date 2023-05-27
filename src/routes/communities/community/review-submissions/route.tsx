import { NewClaimReviewStore } from '@/store/local/claim-review'
import { CommunityStore } from '@/store/local/community'
import { ControlPanelTab } from '@/types/community'
import { FunctionComponent, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export const ReviewSubmissions: FunctionComponent = () => {
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  useEffect(() => {
    setActiveControlPanelTab(ControlPanelTab.REVIEW_SUBMISSION)
  }, [setActiveControlPanelTab])

  return (
    <NewClaimReviewStore.Provider>
      <Outlet />
    </NewClaimReviewStore.Provider>
  )
}
