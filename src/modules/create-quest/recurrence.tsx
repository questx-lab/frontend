'use client'

import { QuestRecurrence, QuestRecurrencesMap } from '@/constants/common.const'
import { TypeButton, TypeButtonFrame } from '@/modules/create-quest/mini-widget'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { FunctionComponent } from 'react'

const Recurrence: FunctionComponent = () => {
  // Data
  const recurrence = NewQuestStore.useStoreState((state) => state.recurrence)
  const display = [
    QuestRecurrence.ONCE,
    QuestRecurrence.DAILY,
    QuestRecurrence.WEEKLY,
    QuestRecurrence.MONTHLY,
  ]

  // Actions
  const setRecurrence = NewQuestStore.useStoreActions((actions) => actions.setRecurrence)

  const items = display.map((e, i) => (
    <TypeButton
      active={recurrence === e}
      key={i}
      onClick={() => {
        setRecurrence(e)
      }}
    >
      {QuestRecurrencesMap.get(e)}
    </TypeButton>
  ))

  return <TypeButtonFrame>{items}</TypeButtonFrame>
}

export default Recurrence
