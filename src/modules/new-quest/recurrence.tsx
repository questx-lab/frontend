'use client'

import { QuestRecurrence, QuestRecurrencesMap } from '@/constants/common.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { ICard, ITypeBox, PICard, TypeBox } from '@/styles/questboard.style'
import { Label } from '@/widgets/text'

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
        <Label>{'REPEAT'}</Label>
        <Gap height={2} />
        <ITypeBox>{items}</ITypeBox>
      </PICard>
    </ICard>
  )
}
