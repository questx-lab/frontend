'use client'

import { FunctionComponent } from 'react'
import { LabelInput } from '@/styles/myProjects.style'
import { Gap } from '@/styles/common.style'
import { ICard, ITypeBox, PICard, TypeBox } from '@/styles/questboard.style'

import { QuestTypeEnum, QuestTypeStringMap } from '@/constants/project.const'
import { NewQuestStore } from './store'

const QuestTypeView = () => {
  const display = [
    QuestTypeEnum.URL,
    QuestTypeEnum.IMAGE,
    QuestTypeEnum.TEXT,
    QuestTypeEnum.QUIZ,
    QuestTypeEnum.VISIT_LINK,
    QuestTypeEnum.EMPTY,
    QuestTypeEnum.TWITTER,
    QuestTypeEnum.DISCORD,
    QuestTypeEnum.JOIN_TELEGRAM,
    QuestTypeEnum.INVITES,
  ]

  const questType = NewQuestStore.useStoreState((state) => state.questType)
  const onQuestTypeChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onQuestTypeChanged
  )

  const listTypeItems = display.map((e, i) => (
    <TypeBox
      active={e === questType}
      key={i}
      onClick={() => {
        onQuestTypeChanged(e)
      }}
    >
      {QuestTypeStringMap.get(e)}
    </TypeBox>
  ))

  return (
    <ICard>
      <PICard>
        <LabelInput>{'SUBMISSION TYPE'}</LabelInput>
        <Gap height={2} />
        <ITypeBox>{listTypeItems}</ITypeBox>
      </PICard>
    </ICard>
  )
}

export default QuestTypeView
