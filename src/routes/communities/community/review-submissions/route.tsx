import { FunctionComponent, useEffect } from 'react'

import { useStoreState } from 'easy-peasy'
import { Outlet, useNavigate } from 'react-router-dom'

import { CommunityRoleEnum } from '@/constants/common.const'
import { RouterConst } from '@/constants/router.const'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { CommunityStore } from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { ControlPanelTab } from '@/types/community'

export const ReviewSubmissions: FunctionComponent = () => {
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

    setActiveControlPanelTab(ControlPanelTab.REVIEW_SUBMISSION)
  }, [setActiveControlPanelTab, user, isOwner, navigate])

  return (
    <NewClaimReviewStore.Provider>
      <Outlet />
    </NewClaimReviewStore.Provider>
  )
}
