'use client'

import { FunctionComponent } from 'react'

import { ClaimedQuestMap, ClaimedQuestStatus } from '@/constants/common.const'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Gap } from '@/styles/common.style'
import { RCard, RICard } from '@/styles/quest-review.style'
import { ITypeBox, TypeBox } from '@/styles/questboard.style'
import { Label } from '@/widgets/text'

import { getListClaimQuest } from './review-submission'

const Status: FunctionComponent<{ projectId: string }> = ({ projectId }) => {
  // Data
  const reviewStatus = NewClaimReviewStore.useStoreState(
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
  const setReviewStatus = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setReviewStatus
  )
  const setHistoryClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setHistoryClaims
  )
  const onLoadingModalChanged = NewClaimReviewStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  // Handler
  const onClick = async (e: string) => {
    onLoadingModalChanged(true)
    setReviewStatus(e)
    await getListClaimQuest(
      projectId,
      e,
      setHistoryClaims,
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
        <Label>{'STATUS'}</Label>
        <Gap height={2} />
        <ITypeBox>{items}</ITypeBox>
      </RICard>
    </RCard>
  )
}

export default Status
