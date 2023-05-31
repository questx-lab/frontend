import { ChangeEvent, FunctionComponent, useEffect } from 'react'

import { NewClaimReviewStore } from '@/store/local/claim-review'

import { ClaimQuestType, ListClaimQuestType, QuestType, Rsp } from '@/utils/type'

import { listClaimedQuestsApi } from '@/app/api/client/claim'
import { FilterColumn, SubmissionColumn } from '@/modules/review-submissions/mini-widget'
import ActionButtons from '@/modules/review-submissions/pending/action-buttons'
import Filter from '@/modules/review-submissions/filter'
import RowItem from '@/modules/review-submissions/pending/row-item'
import { SubmissionsList } from '@/modules/review-submissions/submissions-list'
import { Horizontal } from '@/widgets/orientation'
import tw from 'twin.macro'
import TableHeader from '@/modules/review-submissions/pending/header'
import { CommunityStore } from '@/store/local/community'
import { ClaimedQuestStatus } from '@/constants/common.const'

const Frame = tw(Horizontal)`
  w-full
  h-full
`

const PendingTab: FunctionComponent<{ communityHandle: string }> = ({ communityHandle }) => {
  // data
  const selectedPendings = NewClaimReviewStore.useStoreState((state) => state.selectedPendings)
  const pendingClaims = NewClaimReviewStore.useStoreState((state) => state.pendingClaims)
  const selectedCommunity = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // action
  const setSelectedPending = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setSelectedPending
  )
  const setPendingClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setPendingClaims
  )

  // hook
  useEffect(() => {
    getInitialClaims()
  }, [])

  if (!selectedCommunity) {
    return <></>
  }

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

  const onCheck = (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => {
    if (e.target.checked) {
      selectedPendings.set(value.id, value)
    } else {
      selectedPendings.delete(value.id)
    }

    setSelectedPending(selectedPendings)
  }

  const onFilterChanged = async (selectedQuests: QuestType[]) => {
    const selectedIds = selectedQuests.map((quest) => quest.id)
    const data = await listClaimedQuestsApi(
      selectedCommunity.handle,
      ClaimedQuestStatus.PENDING,
      selectedIds
    )

    if (data.code === 0) {
      // Set either claims or history data.
      setPendingClaims(data.data?.claimed_quests || [])
    }
  }

  return (
    <Frame>
      <SubmissionColumn>
        <TableHeader />

        <SubmissionsList
          list={pendingClaims}
          itemView={(item: ClaimQuestType, index: number) => {
            return (
              <RowItem
                active={selectedPendings.has(item.id)}
                onChange={onCheck}
                claimQuest={item}
                key={index}
              />
            )
          }}
        />
        <ActionButtons />
      </SubmissionColumn>
      <FilterColumn>
        <Filter onFilterChanged={onFilterChanged} />
      </FilterColumn>
    </Frame>
  )
}

export default PendingTab
