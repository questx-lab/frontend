'use client'

import { NewQuestStore } from './store'

import { TypeBox } from '@/styles/questboard.style'
import { QuestRecurrence, QuestRecurrencesMap } from '@/constants/project.const'

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

  return <>{items}</>
}
