import { ChangeEvent, FunctionComponent, useEffect } from 'react'

import toast from 'react-hot-toast'

import { ClaimedQuestStatus, ReviewBtnEnum, TabReviewEnum } from '@/constants/common.const'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'

import { ClaimQuestType } from '@/utils/type'

import {
  ButtonBox,
  ButtonFrame,
  SubmissionAndFilterFrame,
  SubmissionFrame,
  SubmissionListFrame,
} from '@/routes/communities/community/review-submissions/mini-widget'
import SubmissionItemPending from '@/routes/communities/community/review-submissions/submission-item-pending'
import { SubmissionsHeader } from '@/routes/communities/community/review-submissions/submissions-header'
import { SubmissionsList } from '@/routes/communities/community/review-submissions/submissions-list'
import tw from 'twin.macro'
import styled from 'styled-components'

const ActionButton = styled.button<{ btnType?: number }>(({ btnType = ReviewBtnEnum.ACCEPT }) => {
  switch (btnType) {
    case ReviewBtnEnum.REJECT:
      return tw`
        py-2
        border
        border-danger-500
        border-solid
        rounded-lg
        text-sm
        font-medium
        text-danger-700
        w-full
        bg-danger-50
        hover:bg-danger-500
        hover:text-white
      `
    case ReviewBtnEnum.ACCEPT:
      return tw`
        py-2
        border
        border-success-500
        border-solid
        bg-success-50
        rounded-lg
        text-sm
        font-medium
        text-success-700
        w-full
        hover:bg-success-500
        hover:text-white
      `
    default:
      return tw``
  }
})

const RenderBtn: FunctionComponent<{ data: ClaimQuestType[] }> = ({ data }) => {
  // action
  const setPendingClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setPendingClaims
  )
  const onLoadingModalChanged = NewClaimReviewStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  if (!data.length) {
    return <></>
  }

  // Handler
  const updateClaimQuest = async (submissionType: number) => {
    // try {
    //   let action = ClaimedQuestStatus.ACCEPTED
    //   if (submissionType === ReviewBtnEnum.REJECT) {
    //     action = ClaimedQuestStatus.REJECTED
    //   }
    //   const rs = await updateClaimedQuestApi(
    //     data.map((e) => e.id!),
    //     action
    //   )
    //   if (rs.error) {
    //     toast.error(rs.error)
    //   } else {
    //     setPendingClaims([])
    //   }
    //   setTimeout(() => onLoadingModalChanged(false), 200)
    // } catch (error) {
    //   toast.error('Error network')
    //   onLoadingModalChanged(false)
    // }
  }

  const onSubmit = (submitType: number) => {
    updateClaimQuest(submitType)
    onLoadingModalChanged(true)
  }

  return (
    <ButtonFrame>
      <ButtonBox>
        <ActionButton onClick={() => onSubmit(ReviewBtnEnum.REJECT)} btnType={ReviewBtnEnum.REJECT}>
          {'Reject'}
        </ActionButton>
        <ActionButton onClick={() => onSubmit(ReviewBtnEnum.ACCEPT)} btnType={ReviewBtnEnum.ACCEPT}>
          {'Accept'}
        </ActionButton>
      </ButtonBox>
    </ButtonFrame>
  )
}

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
  const onLoadingModalChanged = NewClaimReviewStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  // hook
  useEffect(() => {
    getClaimsQuest()
  }, [])

  const getClaimsQuest = async () => {
    onLoadingModalChanged(true)
    // await getListClaimQuest(
    //   communityHandle,
    //   'pending',
    //   setPendingClaims,
    //   questsSelect.map((e) => e.id!)
    // )
    // setTimeout(() => onLoadingModalChanged(false), 200)
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
      <SubmissionAndFilterFrame>
        <SubmissionFrame>
          <SubmissionsHeader
            title={'Pending Submission'}
            onCheckAll={onCheckAll}
            checked={allPendingChecked}
          />

          <SubmissionListFrame>
            <SubmissionsList
              list={listClaimQuestState}
              itemView={(item: ClaimQuestType, index: number) => {
                return (
                  <SubmissionItemPending
                    tab={TabReviewEnum.HISTORY}
                    active={false}
                    onChange={onCheck}
                    payload={item}
                    key={index}
                  />
                )
              }}
            />
          </SubmissionListFrame>
        </SubmissionFrame>
      </SubmissionAndFilterFrame>

      <RenderBtn data={chooseQuestsState} />
    </>
  )
}

export default PendingTab
