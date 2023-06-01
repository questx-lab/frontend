import { ChangeEvent, FunctionComponent, useState } from 'react'

import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import { updateClaimedQuestApi } from '@/app/api/client/claim'
import { ClaimedQuestStatus, QuestTypeEnum, ReviewBtnEnum } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import { ColButtons } from '@/modules/review-submissions/button'
import {
  Details,
  FullWidth,
  Info,
  Name,
  Row,
  Title,
  VerticalLeftMargin,
} from '@/modules/review-submissions/mini-widget'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { Gap } from '@/styles/common.style'
import { ClaimQuestType } from '@/utils/type'
import { Image } from '@/widgets/image'
import { CheckBox } from '@/widgets/input'
import {
  HorizontalBetweenCenterFullWidth,
  Vertical,
  VerticalCenter,
  VerticalFullWidth,
} from '@/widgets/orientation'
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
          src='https://images.unsplash.com/photo-1685452221648-9b5b870b9195?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
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
  const pendingClaims = NewClaimReviewStore.useStoreState((state) => state.pendingClaims)

  // action
  const onSubmissionModalChanged = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setShowClaimDetails
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
    <Vertical>
      <HorizontalBetweenCenterFullWidth>
        <Row active={active}>
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
          <ColButtons onButtonsAction={onActionButtonClicked} />
        </Row>
      </HorizontalBetweenCenterFullWidth>
      <ClaimedSubmit claimQuest={claimQuest} />
    </Vertical>
  )
}

export default PendingItem
