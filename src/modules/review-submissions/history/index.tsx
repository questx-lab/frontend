import { ChangeEvent, FC, useEffect, useState } from 'react'

import { MoonLoader } from 'react-spinners'

import { listClaimedQuestsApi } from '@/api/claim'
import { ClaimedQuestStatus } from '@/constants/common.const'
import Filter from '@/modules/review-submissions/filter'
import TableHeader from '@/modules/review-submissions/history/header'
import RowItem from '@/modules/review-submissions/history/row-item'
import {
  FilterColumn,
  SubmissionColumn,
  TabContentFrame,
  TableLoadingFrame,
} from '@/modules/review-submissions/mini-widget'
import { SubmissionsList } from '@/modules/review-submissions/submissions-list'
import ClaimReviewStore from '@/store/local/claim-review'
import { ClaimQuestType, ListClaimQuestType, Rsp } from '@/types'
import { QuestType } from '@/types/quest'

const ClaimStatus = ClaimedQuestStatus.ACCEPTED + ',' + ClaimedQuestStatus.REJECTED

const HistoryTab: FC<{ communityHandle: string }> = ({ communityHandle }) => {
  // data
  const historyClaims = ClaimReviewStore.useStoreState((state) => state.historyClaims)
  const selectedHistories = ClaimReviewStore.useStoreState((state) => state.selectedHistories)

  // actions
  const setHistoryClaims = ClaimReviewStore.useStoreActions((state) => state.setHistoryClaims)
  const setSelectedHistory = ClaimReviewStore.useStoreActions(
    (actions) => actions.setSelectedHistory
  )

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
      []
    )

    if (result.code === 0) {
      setHistoryClaims(result.data?.claimed_quests || [])
    } else {
      // TODO: show error here.
    }
  }

  // called when single item checkbox changes.
  const onCheckChanged = (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => {
    if (e.target.checked) {
      selectedHistories.set(value.id, value)
    } else {
      selectedHistories.delete(value.id)
    }

    setSelectedHistory(selectedHistories)
  }

  const onFilterChanged = async (selectedQuests: QuestType[]) => {
    setLoading(true)
    const selectedIds = selectedQuests.map((quest) => quest.id)
    const data = await listClaimedQuestsApi(communityHandle, ClaimStatus, selectedIds)

    if (data.code === 0) {
      // Set either claims or history data.
      setHistoryClaims(data.data?.claimed_quests || [])
      setSelectedHistory(new Map())
    }

    setLoading(false)
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
                return (
                  <RowItem
                    active={selectedHistories.has(item.id)}
                    claim={item}
                    onChange={onCheckChanged}
                  />
                )
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
