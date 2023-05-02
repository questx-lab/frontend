'use client'

import { Layout } from '@/components/layout'
import SidebarCustom from '@/components/sidebar'
import QuestFrame from '@/modules/new-quest/new-quest'
import QuestTemplate from '@/modules/new-quest/quest-template'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { CMain, Wrap } from '@/styles/questboard.style'

export default function Questboard({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <header>
        <title>{'Create Questboard'}</title>
      </header>
      <Wrap>
        <SidebarCustom />
        <CMain>
          <NewQuestStore.Provider>
            <QuestFrame id={params.id} />
          </NewQuestStore.Provider>
        </CMain>
      </Wrap>
    </Layout>
  )
}
