import { ChangeEvent, FunctionComponent, useState } from 'react'

import { updateClaimedQuestApi } from '@/app/api/client/claim'
import { ClaimedQuestStatus, ReviewBtnEnum } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import {
  Details,
  FullWidth,
  Info,
  Name,
  Row,
  Time,
  Title,
  VerticalLeftMargin,
} from '@/modules/review-submissions/mini-widget'
import RowButtons from '@/modules/review-submissions/pending/row-item-buttons'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { ClaimQuestType } from '@/utils/type'
import { Image } from '@/widgets/image'
import { CheckBox } from '@/widgets/input'
import { HorizontalBetweenCenterFullWidth, VerticalCenter } from '@/widgets/orientation'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

const LoadingPosition = tw(VerticalCenter)`
  h-full
`

const RowItem: FunctionComponent<{
  tab: number
  active: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => void
  claimQuest: ClaimQuestType
}> = ({ active, onChange, claimQuest }) => {
  // data
  const pendingClaims = NewClaimReviewStore.useStoreState((state) => state.pendingClaims)

  // action
  const onSubmissionModalChanged = NewClaimReviewStore.useStoreActions(
    (actions) => actions.onSubmissionModalChanged
  )
  const setPendingClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setPendingClaims
  )
  const setClaimActive = NewClaimReviewStore.useStoreActions((actions) => actions.setClaimActive)

  // hook
  const [loading, setLoading] = useState<boolean>(false)

  // Handler
  const onShowModal = () => {
    onSubmissionModalChanged(true)
  }

  // on Button action
  const onActionButtonClicked = (submitType: number) => {
    updateClaimQuest(submitType)
    setLoading(true)
  }

  const updateClaimQuest = async (submissionType: number) => {
    try {
      let action = ClaimedQuestStatus.ACCEPTED
      if (submissionType === ReviewBtnEnum.REJECT) {
        action = ClaimedQuestStatus.REJECTED
      }
      const rs = await updateClaimedQuestApi([claimQuest.id!], action)
      if (rs.error) {
        toast.error(rs.error)
      } else {
        setPendingClaims(pendingClaims.filter((e) => e.id !== claimQuest.id!))
      }

      setTimeout(() => setLoading(false), 200)
    } catch (error) {
      toast.error('Error network')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <LoadingPosition>
        <MoonLoader color='#000' loading speedMultiplier={0.6} size={40} />
      </LoadingPosition>
    )
  }

  return (
    <HorizontalBetweenCenterFullWidth>
      <Row active={active} onClick={() => setClaimActive(claimQuest)}>
        <FullWidth>
          <CheckBox
            checked={active}
            type='checkbox'
            onChange={(value) => onChange(value, claimQuest)}
          />
          <Details onClick={onShowModal}>
            <Title>{claimQuest.quest?.title}</Title>
            <Info>
              <Image
                width={40}
                height={40}
                src={StorageConst.USER_DEFAULT.src}
                alt={StorageConst.USER_DEFAULT.alt}
              />
              <VerticalLeftMargin>
                <Name>{claimQuest.user.name || ''}</Name>
                <Time>{'claimed a few seconds ago'}</Time>
              </VerticalLeftMargin>
            </Info>
          </Details>
        </FullWidth>

        <RowButtons onButtonsAction={onActionButtonClicked} />
      </Row>
    </HorizontalBetweenCenterFullWidth>
  )
}

export default RowItem
