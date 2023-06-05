import { Fragment, FunctionComponent } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { updateClaimedQuestApi } from '@/app/api/client/claim'
import { ClaimedQuestStatus, ReviewBtnEnum } from '@/constants/common.const'
import { RowButtons } from '@/modules/review-submissions/button'
import { ClaimedSubmit } from '@/modules/review-submissions/pending/row-item'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import MultipleInputBox from '@/widgets/input/multiple-input-box'
import { VerticalFullWidth } from '@/widgets/orientation'
import { Label } from '@/widgets/text'

const ClaimBox = tw(VerticalFullWidth)`
  h-full
  gap-6
`

const GapVertical = tw(VerticalFullWidth)`
  gap-4
`

const Review: FunctionComponent = () => {
  // data
  const pendingClaims = NewClaimReviewStore.useStoreState((state) => state.pendingClaims)
  const claimQuestActive = NewClaimReviewStore.useStoreState((state) => state.claimQuestActive)

  // action
  const setPendingClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setPendingClaims
  )
  const setShowClaimDetails = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setShowClaimDetails
  )
  // handler
  const updateClaimQuest = async (submissionType: number) => {
    try {
      let action = ClaimedQuestStatus.ACCEPTED
      if (submissionType === ReviewBtnEnum.REJECT) {
        action = ClaimedQuestStatus.REJECTED
      }
      const rs = await updateClaimedQuestApi([claimQuestActive.id!], action)
      if (rs.error) {
        toast.error(rs.error)
      }
      if (rs.data) {
        setPendingClaims(pendingClaims.filter((e) => e.id !== claimQuestActive.id!))
        toast.success('Successful')
        setShowClaimDetails(false)
      }
    } catch (error) {
      toast.error('Error network')
    }
  }

  if (claimQuestActive.status !== ClaimedQuestStatus.PENDING) {
    return <Fragment />
  }

  return (
    <ClaimBox>
      <GapVertical>
        <Label>REVIEW</Label>
        <MultipleInputBox rows={3} placeholder='Leave a comment...' />
      </GapVertical>
      <RowButtons onButtonsAction={updateClaimQuest} />
    </ClaimBox>
  )
}

const ClaimInfo: FunctionComponent = () => {
  const claimQuestActive = NewClaimReviewStore.useStoreState((state) => state.claimQuestActive)

  return (
    <ClaimBox>
      <GapVertical>
        <Label>SUBMISSION</Label>
        <ClaimedSubmit claimQuest={claimQuestActive} />
      </GapVertical>
      <Review />
    </ClaimBox>
  )
}

export default ClaimInfo
