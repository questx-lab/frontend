import { ChangeEvent, CSSProperties, FunctionComponent } from 'react'

import Image from 'next/image'
import toast from 'react-hot-toast'

import { updateClaimedQuestApi } from '@/app/api/client/quest'
import {
  ClaimedQuestMap,
  ClaimedQuestStatus,
  ReviewBtnEnum,
  TabReviewEnum,
} from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import {
  Btn,
  PAction,
  PCheckBox,
  SCol,
  SDes,
  SInfo,
  SItem,
  SName,
  SRow,
  STag,
  STextInfo,
  SubmitItem,
} from '@/styles/quest-review.style'
import { ClaimQuestType } from '@/types/project.type'

const Action: FunctionComponent<{
  claimQuest: ClaimQuestType
  tab: number
}> = ({ claimQuest, tab }) => {
  // data
  const pendingClaims = NewClaimReviewStore.useStoreState(
    (state) => state.pendingClaims
  )

  // action
  const setPendingClaims = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setPendingClaims
  )
  const onLoadingModalChanged = NewClaimReviewStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  // handler
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
      setTimeout(() => onLoadingModalChanged(false), 200)
    } catch (error) {
      toast.error('Error network')
      onLoadingModalChanged(false)
    }
  }
  const onSubmit = (submitType: number) => {
    updateClaimQuest(submitType)
    onLoadingModalChanged(true)
  }

  if (tab === TabReviewEnum.PENDING) {
    return (
      <PAction>
        <Btn
          onClick={() => onSubmit(ReviewBtnEnum.REJECT)}
          btnType={ReviewBtnEnum.REJECT}
        >
          {'Reject'}
        </Btn>
        <Btn
          onClick={() => onSubmit(ReviewBtnEnum.ACCEPT)}
          btnType={ReviewBtnEnum.ACCEPT}
        >
          {'Accept'}
        </Btn>
      </PAction>
    )
  }

  return (
    <STag claimStatus={claimQuest.status!}>
      {ClaimedQuestMap.get(claimQuest.status! as ClaimedQuestStatus)}
    </STag>
  )
}

const SubmissionItem: FunctionComponent<{
  tab: number
  active: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => void
  payload: ClaimQuestType
  style?: CSSProperties
}> = ({ tab, active, onChange, payload, style }) => {
  // Actions
  const onSubmissionModalChanged = NewClaimReviewStore.useStoreActions(
    (actions) => actions.onSubmissionModalChanged
  )
  const setClaimActive = NewClaimReviewStore.useStoreActions(
    (actions) => actions.setClaimActive
  )

  // Handler
  const onShowModal = () => {
    onSubmissionModalChanged(true)
  }

  return (
    <SRow active={active} style={style} onClick={() => setClaimActive(payload)}>
      <SubmitItem>
        <PCheckBox
          checked={active}
          type='checkbox'
          onChange={(value) => onChange(value, payload)}
        />
        <SItem onClick={onShowModal}>
          <STextInfo>{payload.quest?.title}</STextInfo>
          <SInfo>
            <Image
              width={40}
              height={40}
              src={'/images/dummy/1.svg'}
              alt={StorageConst.AVATAR_DEFAUL.alt}
            />
            <SCol>
              <SName>{payload.user?.name}</SName>
              <SDes>{'claimed a few seconds ago'}</SDes>
            </SCol>
          </SInfo>
        </SItem>
      </SubmitItem>
      <Action claimQuest={payload} tab={tab} />
    </SRow>
  )
}

export default SubmissionItem
