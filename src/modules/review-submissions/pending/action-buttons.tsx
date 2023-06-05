import { FunctionComponent, useState } from 'react'

import { toast } from 'react-hot-toast'

import { listClaimedQuestsApi } from '@/api/claim'
import { updateAllClaimedQuestApi } from '@/api/quest'
import { ClaimedQuestStatus } from '@/constants/common.const'
import { ButtonBox, ButtonFrame } from '@/modules/review-submissions/mini-widget'
import ClaimReviewStore from '@/store/local/claim-review'
import NewQuestSearchStore from '@/store/local/quest-search'
import { ClaimQuestType } from '@/utils/type'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import LoadingModal from '@/widgets/modal/loading'

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
  const [loading, setLoading] = useState<boolean>(false)

  // data
  const selectedPendings = ClaimReviewStore.useStoreState((state) => state.selectedPendings)
  const pendingClaims = ClaimReviewStore.useStoreState((state) => state.pendingClaims)
  const selectedFilteredQuests = NewQuestSearchStore.useStoreState((state) => state.selectedQuest)

  // action
  const setPendingClaims = ClaimReviewStore.useStoreActions((actions) => actions.setPendingClaims)
  const setShowClaimDetails = ClaimReviewStore.useStoreActions(
    (actions) => actions.setShowClaimDetails
  )

  if (!selectedPendings.size) {
    return <></>
  }

  // handler
  const updateClaimQuest = async (status: ClaimedQuestStatus) => {
    setLoading(true)

    // filter to get excluded claims
    const excluded = pendingClaims
      .filter((claim) => !selectedPendings.has(claim.id))
      .map((claim) => claim.id)

    const filteredQuestIds = selectedFilteredQuests.map((quest) => quest.id)

    try {
      const result = await updateAllClaimedQuestApi(
        status,
        communityHandle,
        filteredQuestIds,
        [],
        excluded
      )
      if (result.error) {
        toast.error(result.error)
      }
      if (result.data) {
        await getListClaimQuest(communityHandle, ClaimedQuestStatus.PENDING, setPendingClaims, [])

        toast.success('Successful')
        setShowClaimDetails(false)
      }
    } catch (error) {
      toast.error('Can not change submit review')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ButtonFrame>
      <ButtonBox>
        <PositiveButton
          onClick={() => updateClaimQuest(ClaimedQuestStatus.REJECTED)}
          isFull
          type={ButtonTypeEnum.DANGEROUS_BORDER}
        >
          {'Reject'}
        </PositiveButton>
        <PositiveButton
          onClick={() => {
            return updateClaimQuest(ClaimedQuestStatus.ACCEPTED)
          }}
          isFull
          type={ButtonTypeEnum.SUCCESS_BORDER}
        >
          {'Accept'}
        </PositiveButton>
      </ButtonBox>
      <LoadingModal isOpen={loading} />
    </ButtonFrame>
  )
}

export default ActionButtons
