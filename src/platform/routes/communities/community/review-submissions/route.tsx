import { FC, useEffect } from 'react'

import { useStoreState } from 'easy-peasy'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouterConst } from '@/constants/router.const'
import ClaimReviewStore from '@/store/local/claim-review'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { ControlPanelTab } from '@/types/community'

const ReviewSubmissions: FC = () => {
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

    setActiveControlPanelTab(ControlPanelTab.REVIEW_SUBMISSION)
  }, [setActiveControlPanelTab, user, canEdit, navigate])

  return (
    <ClaimReviewStore.Provider>
      <Outlet />
    </ClaimReviewStore.Provider>
  )
}

export default ReviewSubmissions
