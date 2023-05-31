import { ReviewBtnEnum } from '@/constants/common.const'
import { ButtonBox, ButtonFrame } from '@/modules/review-submissions/mini-widget'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

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

const ActionButtons: FunctionComponent<{}> = ({}) => {
  // data
  const data = NewClaimReviewStore.useStoreState((state) => state.selectedPendings)

  // action
  const setPendingClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setPendingClaims
  )
  const onLoadingModalChanged = NewClaimReviewStore.useStoreActions((actions) => actions.setLoading)

  if (!data.size) {
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

export default ActionButtons
