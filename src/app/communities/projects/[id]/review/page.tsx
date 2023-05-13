'use client'

import { Layout } from '@/components/layout'
import ReviewSubmission from '@/modules/review-submission/review-submission'
import { NewProjectStore } from '@/store/local/project.store'
import { NewClaimReviewStore } from '@/store/local/claim-review'

export default function Review(props: { params: { id: string } }) {
  return (
    <Layout>
      <header>
        <title>{'Project'}</title>
      </header>
      <NewProjectStore.Provider>
        <NewClaimReviewStore.Provider>
          <ReviewSubmission projectId={props.params.id} />
        </NewClaimReviewStore.Provider>
      </NewProjectStore.Provider>
    </Layout>
  )
}
