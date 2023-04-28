'use client'

import { QuestRecurrence, QuestRecurrencesMap } from '@/constants/project.const'
import { Gap } from '@/styles/common.style'
import { LabelInput } from '@/styles/myProjects.style'
import { ICard, ITypeBox, PICard, TypeBox } from '@/styles/questboard.style'

import { NewQuestStore } from './store'

export default function Recurrence() {
  // Data
  const recurrence = NewQuestStore.useStoreState((state) => state.recurrence)
  const display = [
    QuestRecurrence.ONCE,
    QuestRecurrence.DAILY,
    QuestRecurrence.WEEKLY,
    QuestRecurrence.MONTHLY,
  ]

  // Actions
  const onRecurrenceChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onRecurrenceChanged
  )

  const items = display.map((e, i) => (
    <TypeBox
      active={recurrence === e}
      key={i}
      onClick={() => {
        onRecurrenceChanged(e)
      }}
    >
      {QuestRecurrencesMap.get(e)}
    </TypeBox>
  ))

  return (
    <ICard>
      <PICard>
        <LabelInput>{'REPEAT'}</LabelInput>
        <Gap height={2} />
        <ITypeBox>{items}</ITypeBox>
      </PICard>
    </ICard>
  )
}
