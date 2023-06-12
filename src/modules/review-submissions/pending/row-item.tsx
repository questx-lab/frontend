import { ChangeEvent, FunctionComponent, useState } from 'react'

import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import { updateClaimedQuestApi } from '@/api/claim'
import { ClaimedQuestStatus, QuestTypeEnum, ReviewBtnEnum } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { ColumnButtons } from '@/modules/review-submissions/button'
import {
  Details,
  FullWidth,
  Info,
  Name,
  Row,
  Title,
  VerticalItem,
  VerticalLeftMargin,
} from '@/modules/review-submissions/mini-widget'
import ClaimReviewStore from '@/store/local/claim-review'
import { ClaimQuestType } from '@/types'
import { Image } from '@/widgets/image'
import { CheckBox } from '@/widgets/input'
import {
  HorizontalBetweenCenterFullWidth,
  VerticalCenter,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { NormalText } from '@/widgets/text'

const LoadingPosition = tw(VerticalCenter)`
  h-full
`

const PaddingBottom = tw.div`
  px-4
  pb-3
`

const PaddingHorizontal = tw.div`
  px-4
  pb-4
`

export const ClaimedSubmit: FunctionComponent<{ claimQuest: ClaimQuestType }> = ({
  claimQuest,
}) => {
  if (claimQuest.quest.type === QuestTypeEnum.IMAGE) {
    return (
      <PaddingBottom>
        <Image
          height={150}
          width={500}
          alt='image'
          className='rounded-lg'
          src={claimQuest.submission_data}
        />
      </PaddingBottom>
    )
  }
  return (
    <VerticalFullWidth>
      <PaddingHorizontal>
        <NormalText>{claimQuest.submission_data}</NormalText>
      </PaddingHorizontal>
    </VerticalFullWidth>
  )
}

const PendingItem: FunctionComponent<{
  active: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => void
  claimQuest: ClaimQuestType
}> = ({ active, onChange, claimQuest }) => {
  // data
  const pendingClaims = ClaimReviewStore.useStoreState((state) => state.pendingClaims)

  // action
  const onSubmissionModalChanged = ClaimReviewStore.useStoreActions(
    (actions) => actions.setShowClaimDetails
  )
  const setPendingClaims = ClaimReviewStore.useStoreActions((actions) => actions.setPendingClaims)
  const setClaimActive = ClaimReviewStore.useStoreActions((actions) => actions.setClaimActive)

  // hook
  const [loading, setLoading] = useState<boolean>(false)

  // Handler
  const onShowModal = () => {
    onSubmissionModalChanged(true)
    setClaimActive(claimQuest)
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
    <VerticalItem active={active}>
      <HorizontalBetweenCenterFullWidth>
        <Row>
          <FullWidth>
            <CheckBox
              className='mt-1'
              checked={active}
              type='checkbox'
              onChange={(value) => onChange(value, claimQuest)}
            />
            <Details onClick={onShowModal}>
              <Title>{claimQuest.quest?.title}</Title>
              <Info>
                <Image
                  width={50}
                  height={50}
                  src={StorageConst.USER_DEFAULT.src}
                  alt={StorageConst.USER_DEFAULT.alt}
                />
                <VerticalLeftMargin>
                  <Name>{claimQuest.user.name || ''}</Name>
                  {
                    // TODO: Display the claim time here.
                    /* <Time>{'claimed a few seconds ago'}</Time> */
                  }
                </VerticalLeftMargin>
              </Info>
              <Gap />
            </Details>
          </FullWidth>
          <ColumnButtons onButtonsAction={onActionButtonClicked} />
        </Row>
      </HorizontalBetweenCenterFullWidth>
      <ClaimedSubmit claimQuest={claimQuest} />
    </VerticalItem>
  )
}

export default PendingItem
