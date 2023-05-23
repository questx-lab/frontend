'use client'

import { QuestTypeEnum, QuestTypeStringMap } from '@/constants/common.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { ICard, ITypeBox, PICard, TypeBox } from '@/styles/questboard.style'
import { Label } from '@/widgets/text'

import QuestDetails from './quest-details'

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

  // data
  const questType = NewQuestStore.useStoreState((state) => state.questType)

  // actions
  const onQuestTypeChanged = NewQuestStore.useStoreActions(
    (actions) => actions.setQuestType
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
        <Label>{'SUBMISSION TYPE'}</Label>
        <ITypeBox>{listTypeItems}</ITypeBox>
      </PICard>
      <QuestDetails />
    </ICard>
  )
}

export default QuestTypeView
