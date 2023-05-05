'use client'

import { FunctionComponent } from 'react'

import { ClaimedQuestMap, ClaimedQuestStatus } from '@/constants/project.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { Gap } from '@/styles/common.style'
import { LabelInput } from '@/styles/myProjects.style'
import { RCard, RICard } from '@/styles/quest-review.style'
import { ITypeBox, TypeBox } from '@/styles/questboard.style'

import { getListClaimQuest } from './review-submission'

const Status: FunctionComponent<{ projectId: string }> = ({ projectId }) => {
  // Data
  const reviewStatus = NewQuestStore.useStoreState(
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
  const onReviewStatusChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onReviewStatusChanged
  )
  const onListClaimQuestHistoryChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onListClaimQuestHistoryChanged
  )
  const onLoadingModalChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  // Handler
  const onClick = async (e: string) => {
    onLoadingModalChanged(true)
    onReviewStatusChanged(e)
    await getListClaimQuest(
      projectId,
      e,
      onListClaimQuestHistoryChanged,
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
