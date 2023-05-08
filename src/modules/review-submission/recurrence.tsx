'use client'

import { QuestRecurrence, QuestRecurrencesMap } from '@/constants/project.const'
import { NewQuestClaimStore } from '@/store/local/quest-claim.store'
import { Gap } from '@/styles/common.style'
import { LabelInput } from '@/styles/myProjects.style'
import { RCard, RICard } from '@/styles/quest-review.style'
import { ITypeBox, TypeBox } from '@/styles/questboard.style'

export default function Recurrence() {
  // Data
  const recurrence = NewQuestClaimStore.useStoreState(
    (state) => state.recurrence
  )
  const display = [
    QuestRecurrence.ONCE,
    QuestRecurrence.DAILY,
    QuestRecurrence.WEEKLY,
    QuestRecurrence.MONTHLY,
  ]

  // Actions
  const setRecurrence = NewQuestClaimStore.useStoreActions(
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
    <RCard>
      <RICard>
        <LabelInput>{'RECURRENCE'}</LabelInput>
        <Gap height={2} />
        <ITypeBox>{items}</ITypeBox>
      </RICard>
    </RCard>
  )
}
