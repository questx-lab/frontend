'use client'

import { FunctionComponent } from 'react'

import { ClaimedQuestMap, ClaimedQuestStatus } from '@/constants/project.const'
import { NewQuestClaimStore } from '@/store/local/quest-claim.store'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Gap } from '@/styles/common.style'
import { LabelInput } from '@/styles/myProjects.style'
import { RCard, RICard } from '@/styles/quest-review.style'
import { ITypeBox, TypeBox } from '@/styles/questboard.style'

import { getListClaimQuest } from './review-submission'

const Status: FunctionComponent<{ projectId: string }> = ({ projectId }) => {
  // Data
  const reviewStatus = NewQuestClaimStore.useStoreState(
    (state) => state.reviewStatus
  )
  const questsSelect = NewQuestSearchStore.useStoreState(
    (state) => state.questsSelect
  )
  const display = [
    ClaimedQuestStatus.ALL,
    ClaimedQuestStatus.ACCEPTED,
    ClaimedQuestStatus.REJECTED,
  ]

  // Actions
  const onReviewStatusChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onReviewStatusChanged
  )
  const onHistoryClaimsChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onHistoryClaimsChanged
  )
  const onLoadingModalChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  // Handler
  const onClick = async (e: string) => {
    onLoadingModalChanged(true)
    onReviewStatusChanged(e)
    await getListClaimQuest(
      projectId,
      e,
      onHistoryClaimsChanged,
      questsSelect.map((e) => e.id!)
    )
    setTimeout(() => onLoadingModalChanged(false), 200)
  }

  const items = display.map((e, i) => (
    <TypeBox active={reviewStatus === e} key={i} onClick={() => onClick(e)}>
      {ClaimedQuestMap.get(e)}
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

export default Status
