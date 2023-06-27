import { ChangeEvent, FC, useEffect, useState } from 'react'

import { MoonLoader } from 'react-spinners'

import { listClaimedQuestsApi } from '@/api/claim'
import { ClaimedQuestStatus } from '@/constants/common.const'
import Filter from '@/modules/review-submissions/filter'
import {
  FilterColumn,
  SubmissionColumn,
  TabContentFrame,
  TableLoadingFrame,
} from '@/modules/review-submissions/mini-widget'
import ActionButtons from '@/modules/review-submissions/pending/action-buttons'
import TableHeader from '@/modules/review-submissions/pending/header'
import PendingItem from '@/modules/review-submissions/pending/row-item'
import { SubmissionsList } from '@/modules/review-submissions/submissions-list'
import ClaimReviewStore from '@/store/local/claim-review'
import CommunityStore from '@/store/local/community'
import { ClaimQuestType, ListClaimQuestType, Rsp } from '@/types'
import { QuestType } from '@/types/quest'

const PendingContent: FC<{ loading: boolean }> = ({ loading }) => {
  // data
  const pendingClaims = ClaimReviewStore.useStoreState((state) => state.pendingClaims)
  const selectedPendings = ClaimReviewStore.useStoreState((state) => state.selectedPendings)
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // action
  const setSelectedPending = ClaimReviewStore.useStoreActions(
    (actions) => actions.setSelectedPending
  )

  if (loading) {
    return (
      <TableLoadingFrame>
        <MoonLoader />
      </TableLoadingFrame>
    )
  }

  // called when single item checkbox changes.
  const onCheckChanged = (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => {
    if (e.target.checked) {
      selectedPendings.set(value.id, value)
    } else {
      selectedPendings.delete(value.id)
    }

    setSelectedPending(selectedPendings)
  }

  return (
    <>
      <SubmissionsList
        list={pendingClaims}
        itemView={(item: ClaimQuestType, index: number) => {
          return (
            <PendingItem
              active={selectedPendings.has(item.id)}
              onChange={onCheckChanged}
              claimQuest={item}
              key={index}
            />
          )
        }}
      />
      <ActionButtons communityHandle={selectedCommunity.handle} />
    </>
  )
}

const PendingTab: FC<{ communityHandle: string }> = ({ communityHandle }) => {
  // data
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // action
  const setSelectedPending = ClaimReviewStore.useStoreActions(
    (actions) => actions.setSelectedPending
  )
  const setPendingClaims = ClaimReviewStore.useStoreActions((actions) => actions.setPendingClaims)

  // hook
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    getInitialClaims()
    setLoading(false)
  }, [])

  if (!selectedCommunity) {
    return <></>
  }

  // called once when the view is created.
  const getInitialClaims = async () => {
    const result: Rsp<ListClaimQuestType> = await listClaimedQuestsApi(
      communityHandle,
      'pending',
      []
    )

    if (result.code === 0) {
      setPendingClaims(result.data?.claimed_quests || [])
    } else {
      // TODO: show error here.
    }
  }

  // called when filter changes
  const onFilterChanged = async (selectedQuests: QuestType[]) => {
    setLoading(true)

    const selectedIds = selectedQuests.map((quest) => quest.id)
    const data = await listClaimedQuestsApi(
      selectedCommunity.handle,
      ClaimedQuestStatus.PENDING,
      selectedIds
    )

    if (data.code === 0) {
      // Set either claims or history data.
      setPendingClaims(data.data?.claimed_quests || [])
      setSelectedPending(new Map())
    } else {
      // TODO: Show error message
    }

    setLoading(false)
  }

  return (
    <>
      <TabContentFrame>
        <SubmissionColumn>
          <TableHeader />
          <PendingContent loading={loading} />
        </SubmissionColumn>
        <FilterColumn>
          <Filter onFilterChanged={onFilterChanged} />
        </FilterColumn>
      </TabContentFrame>
    </>
  )
}

export default PendingTab
