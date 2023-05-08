'use client'

import { QuestRecurrence, QuestRecurrencesMap } from '@/constants/project.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { LabelInput } from '@/styles/myProjects.style'
import { ICard, ITypeBox, PICard, TypeBox } from '@/styles/questboard.style'

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
  const setRecurrence = NewQuestStore.useStoreActions(
    (actions) => actions.setRecurrence
  )

  const items = display.map((e, i) => (
    <TypeBox
      active={recurrence === e}
      key={i}
      onClick={() => {
        setRecurrence(e)
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
