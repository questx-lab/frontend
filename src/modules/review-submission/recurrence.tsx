'use client'

import { QuestRecurrence, QuestRecurrencesMap } from '@/constants/common.const'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { Gap } from '@/styles/common.style'
import { RCard, RICard } from '@/styles/quest-review.style'
import { ITypeBox, TypeBox } from '@/styles/questboard.style'
import { Label } from '@/widgets/text'

export default function Recurrence() {
  // Data
  const recurrence = NewClaimReviewStore.useStoreState(
    (state) => state.recurrence
  )
  const display = [
    QuestRecurrence.ONCE,
    QuestRecurrence.DAILY,
    QuestRecurrence.WEEKLY,
    QuestRecurrence.MONTHLY,
  ]

  // Actions
  const setRecurrence = NewClaimReviewStore.useStoreActions(
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
        <Label>{'RECURRENCE'}</Label>
        <Gap height={2} />
        <ITypeBox>{items}</ITypeBox>
      </RICard>
    </RCard>
  )
}
