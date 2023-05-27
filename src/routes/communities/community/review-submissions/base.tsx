import { NewClaimReviewStore } from '@/store/local/claim-review'
import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'

export const ReviewSubmissions: FunctionComponent = () => {
  return (
    <NewClaimReviewStore.Provider>
      <Outlet />
    </NewClaimReviewStore.Provider>
  )
}
