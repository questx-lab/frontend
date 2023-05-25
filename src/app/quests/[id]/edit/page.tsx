'use client'

import { Layout } from '@/components/layout'
import ProjectSide from '@/components/sidebar'
import QuestFrame from '@/modules/new-quest/quest-frame'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { CMain, Wrap } from '@/styles/questboard.style'

export default function Questboard({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <header>
        <title>{'Create Questboard'}</title>
      </header>
      <Wrap>
        <ProjectSide activeCommunityId={''} />
        <CMain>
          <NewQuestStore.Provider>
            <QuestFrame id={params.id} isTemplate={false} isEdit={true} />
          </NewQuestStore.Provider>
        </CMain>
      </Wrap>
    </Layout>
  )
}
