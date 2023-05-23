'use client'

import { Layout } from '@/components/layout'
import ReviewSubmission from '@/modules/review-submission/review-submission'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { CommunityStore } from '@/store/local/community.store'

export default function Review(props: { params: { id: string } }) {
  return (
    <Layout>
      <header>
        <title>{'Project'}</title>
      </header>
      <CommunityStore.Provider>
        <NewClaimReviewStore.Provider>
          <ReviewSubmission communityId={props.params.id} />
        </NewClaimReviewStore.Provider>
      </CommunityStore.Provider>
    </Layout>
  )
}
