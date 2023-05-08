'use client'

import { Layout } from '@/components/layout'
import ReviewSubmission from '@/modules/review-submission/review-submission'
import { NewProjectStore } from '@/store/local/project.store'
import { NewQuestClaimStore } from '@/store/local/quest-claim.store'

export default function Review(props: { params: { id: string } }) {
  return (
    <Layout>
      <header>
        <title>{'Project'}</title>
      </header>
      <NewProjectStore.Provider>
        <NewQuestClaimStore.Provider>
          <ReviewSubmission projectId={props.params.id} />
        </NewQuestClaimStore.Provider>
      </NewProjectStore.Provider>
    </Layout>
  )
}
