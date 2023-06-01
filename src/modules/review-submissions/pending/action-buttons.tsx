import { updateAllClaimedQuestApi } from '@/app/api/client/quest'
import { ClaimedQuestStatus, ReviewBtnEnum } from '@/constants/common.const'
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

const ActionButtons: FunctionComponent<{ communityHandle: string }> = ({ communityHandle }) => {
  // data
  const selectedPendings = NewClaimReviewStore.useStoreState((state) => state.selectedPendings)
  const pendingClaims = NewClaimReviewStore.useStoreState((state) => state.pendingClaims)

  // action
  const setLoading = NewClaimReviewStore.useStoreActions((actions) => actions.setLoading)

  if (!selectedPendings.size) {
    return <></>
  }

  // handler
  const updateClaimQuest = async (status: ClaimedQuestStatus) => {
    // filter to get excluded claims
    const excluded = pendingClaims
      .filter((claim) => !selectedPendings.has(claim.id))
      .map((claim) => claim.id)

    await updateAllClaimedQuestApi(status, communityHandle, '', '', excluded)
  }

  const onSubmit = (status: ClaimedQuestStatus) => {
    setLoading(true)
    updateClaimQuest(status)
    setLoading(false)
  }

  return (
    <ButtonFrame>
      <ButtonBox>
        <ActionButton
          onClick={() => onSubmit(ClaimedQuestStatus.REJECTED)}
          btnType={ReviewBtnEnum.REJECT}
        >
          {'Reject'}
        </ActionButton>
        <ActionButton
          onClick={() => {
            return onSubmit(ClaimedQuestStatus.ACCEPTED)
          }}
          btnType={ReviewBtnEnum.ACCEPT}
        >
          {'Accept'}
        </ActionButton>
      </ButtonBox>
    </ButtonFrame>
  )
}

export default ActionButtons
