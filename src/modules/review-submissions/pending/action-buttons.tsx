import { FunctionComponent, useState } from 'react'

import { toast } from 'react-hot-toast'

import { listClaimedQuestsApi } from '@/app/api/client/claim'
import { updateAllClaimedQuestApi } from '@/app/api/client/quest'
import { ClaimedQuestStatus } from '@/constants/common.const'
import { ButtonBox, ButtonFrame } from '@/modules/review-submissions/mini-widget'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import { ClaimQuestType } from '@/utils/type'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons/button'

const getListClaimQuest = async (
  communityHandle: string,
  filterQuest: string = ClaimedQuestStatus.ALL,
  onAction: (action: ClaimQuestType[]) => void,
  filterQuestIds?: string[]
) => {
  try {
    const data = await listClaimedQuestsApi(communityHandle, filterQuest, filterQuestIds ?? [])
    if (data.error) {
      toast.error(data.error)
    } else {
      onAction(data.data?.claimed_quests!)
    }
  } catch (error) {}
}

const ActionButtons: FunctionComponent<{ communityHandle: string }> = ({ communityHandle }) => {
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false)
  const [rejectLoading, setRejectLoading] = useState<boolean>(false)

  // data
  const selectedPendings = NewClaimReviewStore.useStoreState((state) => state.selectedPendings)
  const pendingClaims = NewClaimReviewStore.useStoreState((state) => state.pendingClaims)
  const selectedFilteredQuests = NewQuestSearchStore.useStoreState((state) => state.selectedQuest)

  // action
  const setPendingClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setPendingClaims
  )
  const setShowClaimDetails = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setShowClaimDetails
  )

  if (!selectedPendings.size) {
    return <></>
  }
  console.log('selectedPendings', selectedPendings)
  // handler
  const updateClaimQuest = async (status: ClaimedQuestStatus) => {
    if (status === ClaimedQuestStatus.REJECTED) {
      setRejectLoading(true)
    } else {
      setAcceptLoading(true)
    }

    // filter to get excluded claims
    const excluded = pendingClaims
      .filter((claim) => !selectedPendings.has(claim.id))
      .map((claim) => claim.id)

    const filteredQuestIds = selectedFilteredQuests.map((quest) => quest.id)

    try {
      const rs = await updateAllClaimedQuestApi(
        status,
        communityHandle,
        filteredQuestIds,
        [],
        excluded
      )
      if (rs.error) {
        toast.error(rs.error)
      }
      if (rs.data) {
        await getListClaimQuest(communityHandle, ClaimedQuestStatus.PENDING, setPendingClaims, [])

        toast.success('Successful')
        setShowClaimDetails(false)
      }
    } catch (error) {
      toast.error('Can not change submit review')
    } finally {
      if (status === ClaimedQuestStatus.REJECTED) {
        setRejectLoading(false)
      } else {
        setAcceptLoading(false)
      }
    }
  }

  return (
    <ButtonFrame>
      <ButtonBox>
        <PositiveButton
          onClick={() => updateClaimQuest(ClaimedQuestStatus.REJECTED)}
          loading={rejectLoading}
          isFull
          type={ButtonTypeEnum.DANGEROUS_BORDER}
        >
          {'Reject'}
        </PositiveButton>
        <PositiveButton
          onClick={() => {
            return updateClaimQuest(ClaimedQuestStatus.ACCEPTED)
          }}
          loading={acceptLoading}
          isFull
          type={ButtonTypeEnum.SUCCESS_BORDER}
        >
          {'Accept'}
        </PositiveButton>
      </ButtonBox>
    </ButtonFrame>
  )
}

export default ActionButtons
