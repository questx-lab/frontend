'use client'

import { Layout } from '@/components/layout'
import ReviewSubmission from '@/modules/review-submission/review-submission'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { NewProjectStore } from '@/store/local/project.store'

export default function Review(props: { params: { id: string } }) {
  return (
    <Layout>
      <header>
        <title>{'Project'}</title>
      </header>
      <NewProjectStore.Provider>
        <NewQuestStore.Provider>
          <ReviewSubmission projectId={props.params.id} />
        </NewQuestStore.Provider>
      </NewProjectStore.Provider>
    </Layout>
  )
}
