import { ChangeEvent, FunctionComponent, useEffect } from 'react'

import { TabReviewEnum } from '@/constants/common.const'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'

import { ClaimQuestType, ListClaimQuestType, Rsp } from '@/utils/type'

import { SubmissionBorder } from '@/modules/review-submissions/mini-widget'
import ActionButtons from '@/modules/review-submissions/pending/action-buttons'
import RowItem from '@/modules/review-submissions/pending/row-item'
import { SubmissionsHeader } from '@/modules/review-submissions/submissions-header'
import { SubmissionsList } from '@/modules/review-submissions/submissions-list'
import { FullWidthHeight } from '@/widgets/orientation'
import { listClaimedQuestsApi } from '@/app/api/client/claim'

const PendingTab: FunctionComponent<{ communityHandle: string }> = ({ communityHandle }) => {
  // data
  const chooseQuestsState = NewClaimReviewStore.useStoreState((state) => state.chooseQuestsPending)
  const allPendingChecked = NewClaimReviewStore.useStoreState((state) => state.allCheckPending)
  const listClaimQuestState = NewClaimReviewStore.useStoreState((state) => state.pendingClaims)
  const questsSelect = NewQuestSearchStore.useStoreState((state) => state.questsSelect)

  // action
  const setChoosePending = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setChoosePending
  )
  const setCheckPending = NewClaimReviewStore.useStoreActions((actions) => actions.setCheckPending)
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
      questsSelect.map((e) => e.id!)
    )

    if (result.code === 0) {
      setPendingClaims(result.data?.claimed_quests || [])
    } else {
      // TODO: show error here.
    }
  }

  const onCheck = (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => {
    if (e.target.checked) {
      setChoosePending([...chooseQuestsState, value])
    } else {
      setChoosePending(chooseQuestsState.filter((data) => data !== value))
    }
  }

  const onCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckPending(e.target.checked)
    if (e.target.checked) {
      setChoosePending(listClaimQuestState.map((e) => e))
    } else {
      setChoosePending([])
    }
  }

  return (
    <>
      <FullWidthHeight>
        <SubmissionBorder>
          <SubmissionsHeader
            title={'Pending Submission'}
            onCheckAll={onCheckAll}
            checked={allPendingChecked}
          />

          <SubmissionsList
            list={listClaimQuestState}
            itemView={(item: ClaimQuestType, index: number) => {
              return (
                <RowItem
                  tab={TabReviewEnum.HISTORY}
                  active={false}
                  onChange={onCheck}
                  claimQuest={item}
                  key={index}
                />
              )
            }}
          />
        </SubmissionBorder>
      </FullWidthHeight>

      <ActionButtons data={chooseQuestsState} />
    </>
  )
}

export default PendingTab
