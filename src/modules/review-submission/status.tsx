'use client'

import { ReviewStatusEnum, ReviewStatusMap } from '@/constants/project.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Gap } from '@/styles/common.style'
import { LabelInput } from '@/styles/myProjects.style'
import { RCard, RICard } from '@/styles/quest-review.style'
import { ITypeBox, TypeBox } from '@/styles/questboard.style'

export default function Status() {
  // Data
  const reviewStatus = NewQuestStore.useStoreState(
    (state) => state.reviewStatus
  )
  const display = [ReviewStatusEnum.SUCCESS, ReviewStatusEnum.FAIL]

  // Actions
  const onReviewStatusChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onReviewStatusChanged
  )

  const items = display.map((e, i) => (
    <TypeBox
      active={reviewStatus === e}
      key={i}
      onClick={() => {
        onReviewStatusChanged(e)
      }}
    >
      {ReviewStatusMap.get(e)}
    </TypeBox>
  ))

  return (
    <RCard>
      <RICard>
        <LabelInput>{'STATUS'}</LabelInput>
        <Gap height={2} />
        <ITypeBox>{items}</ITypeBox>
      </RICard>
    </RCard>
  )
}
