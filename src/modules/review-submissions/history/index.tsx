import { listClaimedQuestsApi } from '@/app/api/client/claim'
import { ClaimedQuestStatus } from '@/constants/common.const'
import Filter from '@/modules/review-submissions/filter'
import RowItem from '@/modules/review-submissions/history/row-item'
import {
  FilterColumn,
  SubmissionColumn,
  TabContentFrame,
  TableLoadingFrame,
} from '@/modules/review-submissions/mini-widget'
import TableHeader from '@/modules/review-submissions/pending/header'
import { SubmissionsList } from '@/modules/review-submissions/submissions-list'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { ClaimQuestType, ListClaimQuestType, QuestType, Rsp } from '@/utils/type'
import { FunctionComponent, useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners'

const ClaimStatus = ClaimedQuestStatus.ACCEPTED + ',' + ClaimedQuestStatus.REJECTED

const HistoryTab: FunctionComponent<{ communityHandle: string }> = ({ communityHandle }) => {
  // data
  const selectedQuest = NewQuestSearchStore.useStoreState((state) => state.selectedQuest)
  const historyClaims = NewClaimReviewStore.useStoreState((state) => state.historyClaims)

  // actions
  const setHistoryClaims = NewClaimReviewStore.useStoreActions((state) => state.setHistoryClaims)

  // Hook
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    getClaimsQuest()
    setLoading(false)
  }, [])

  const getClaimsQuest = async () => {
    const result: Rsp<ListClaimQuestType> = await listClaimedQuestsApi(
      communityHandle,
      ClaimStatus,
      selectedQuest.map((claim) => claim.id!)
    )

    if (result.code === 0) {
      setHistoryClaims(result.data?.claimed_quests || [])
    } else {
      // TODO: show error here.
    }
  }

  const onFilterChanged = async (selectedQuests: QuestType[]) => {
    const selectedIds = selectedQuests.map((quest) => quest.id)
    const data = await listClaimedQuestsApi(communityHandle, ClaimStatus, selectedIds)

    if (data.code === 0) {
      // Set either claims or history data.
      setHistoryClaims(data.data?.claimed_quests || [])
    }
  }

  return (
    <>
      <TabContentFrame>
        <SubmissionColumn>
          <TableHeader />

          {!loading && (
            <SubmissionsList
              list={historyClaims}
              itemView={(item: ClaimQuestType, index: number) => {
                return <RowItem active={false} claim={item} onChange={() => {}} />
              }}
            />
          )}

          {loading && (
            <TableLoadingFrame>
              <MoonLoader />
            </TableLoadingFrame>
          )}
        </SubmissionColumn>
        <FilterColumn>
          <Filter onFilterChanged={onFilterChanged} />
        </FilterColumn>
      </TabContentFrame>
    </>
  )
}

export default HistoryTab
