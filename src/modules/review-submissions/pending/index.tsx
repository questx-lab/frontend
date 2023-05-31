import { ChangeEvent, FunctionComponent, useEffect } from 'react'

import { NewClaimReviewStore } from '@/store/local/claim-review'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'

import { ClaimQuestType, ListClaimQuestType, Rsp } from '@/utils/type'

import { listClaimedQuestsApi } from '@/app/api/client/claim'
import { SubmissionBorder } from '@/modules/review-submissions/mini-widget'
import ActionButtons from '@/modules/review-submissions/pending/action-buttons'
import { Header } from '@/modules/review-submissions/pending/header'
import RowItem from '@/modules/review-submissions/pending/row-item'
import { SubmissionsList } from '@/modules/review-submissions/submissions-list'
import { FullWidthHeight } from '@/widgets/orientation'

const PendingTab: FunctionComponent<{ communityHandle: string }> = ({ communityHandle }) => {
  // data
  const chooseQuestsState = NewClaimReviewStore.useStoreState((state) => state.chooseQuestsPending)
  const pendingClaims = NewClaimReviewStore.useStoreState((state) => state.pendingClaims)
  const selectedQuest = NewQuestSearchStore.useStoreState((state) => state.selectedQuest)

  // action
  const setSelectedPending = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setSelectedPending
  )
  const setPendingClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setPendingClaims
  )

  // hook
  useEffect(() => {
    getClaimsQuest()
  }, [])

  const getClaimsQuest = async () => {
    const result: Rsp<ListClaimQuestType> = await listClaimedQuestsApi(
      communityHandle,
      'pending',
      selectedQuest.map((e) => e.id!)
    )

    if (result.code === 0) {
      setPendingClaims(result.data?.claimed_quests || [])
    } else {
      // TODO: show error here.
    }
  }

  const onCheck = (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => {
    if (e.target.checked) {
      setSelectedPending([...chooseQuestsState, value])
    } else {
      setSelectedPending(chooseQuestsState.filter((data) => data !== value))
    }
  }

  return (
    <>
      <FullWidthHeight>
        <SubmissionBorder>
          <Header />

          <SubmissionsList
            list={pendingClaims}
            itemView={(item: ClaimQuestType, index: number) => {
              return <RowItem active={false} onChange={onCheck} claimQuest={item} key={index} />
            }}
          />
        </SubmissionBorder>
      </FullWidthHeight>

      <ActionButtons data={chooseQuestsState} />
    </>
  )
}

export default PendingTab
