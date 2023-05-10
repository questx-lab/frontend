'use client'

import { FunctionComponent } from 'react'

import { QuestView } from '@/modules/quests/single-quest'
import { Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import { QTWrap } from '@/styles/leaderboard.style'
import { WrapQuestboard } from '@/styles/questboard.style'
import { QuestType } from '@/types/project.type'

export const QuestListView: FunctionComponent<{
  questList: QuestType[]
}> = ({ questList }) => {
  if (!questList) {
    return <div>{'There are currently no quests'}</div>
  }

  const questListView = questList.map((quest) => (
    <QuestView quest={quest} key={quest.id} />
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
      <QTWrap>
        <HeaderText>{'👌 Invite'}</HeaderText>
        <Gap height={6} />
        <WrapQuestboard>
          <QuestListView questList={questList} />
        </WrapQuestboard>
      </QTWrap>
    </>
  )
}
