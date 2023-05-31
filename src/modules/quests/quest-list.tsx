'use client'

import { FunctionComponent } from 'react'

import { QuestView } from '@/modules/quests/single-quest'
import { ActiveQuestStore } from '@/store/local/active-quest.store'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import { WrapQuestboard } from '@/styles/questboard.style'
import { QuestType } from '@/utils/type'
import { VerticalFullWidth } from '@/widgets/orientation'

export const QuestListView: FunctionComponent<{
  questList: QuestType[]
}> = ({ questList }) => {
  if (!questList) {
    return <div>{'There are currently no quests'}</div>
  }

  const questListView = questList.map((quest) => (
    <ActiveQuestStore.Provider key={quest.id}>
      <NewQuestStore.Provider>
        <QuestView quest={quest} />
      </NewQuestStore.Provider>
    </ActiveQuestStore.Provider>
  ))

  return <>{questListView}</>
}

export const Quests: FunctionComponent<{
  questList: QuestType[]
  show: boolean
}> = ({ questList, show }) => {
  if (!show) {
    return <></>
  }

  return (
    <>
      <VerticalFullWidth>
        <HeaderText>{'👌 Invite'}</HeaderText>
        <Gap height={6} />
        <WrapQuestboard>
          <QuestListView questList={questList} />
        </WrapQuestboard>
      </VerticalFullWidth>
    </>
  )
}
