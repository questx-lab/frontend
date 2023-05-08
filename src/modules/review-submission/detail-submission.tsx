import { FunctionComponent } from 'react'

import Image from 'next/image'
import toast from 'react-hot-toast'

import { updateClaimedQuestApi } from '@/app/api/client/quest'
import {
  ClaimedQuestMap,
  ClaimedQuestStatus,
  ReviewBtnEnum,
} from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { NewQuestClaimStore } from '@/store/local/quest-claim.store'
import { Divider, Gap } from '@/styles/common.style'
import { MulInputBox } from '@/styles/input.style'
import {
  Btn,
  BtnSubmitWrap,
  EmptyBox,
  MDBody,
  MDDes,
  MDHead,
  MDInfo,
  MDLeftSide,
  MDPadding,
  MDRightSide,
  MDTitle,
  ModalBox,
  ModalContent,
  SCol,
  SDes,
  SInfo,
  SName,
  STag,
} from '@/styles/quest-review.style'
import { ClaimQuestType } from '@/types/project.type'
import { BaseModal } from '@/widgets/modal'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Action: FunctionComponent<{
  claimQuest: ClaimQuestType
}> = ({ claimQuest }) => {
  // data
  const pendingClaims = NewQuestClaimStore.useStoreState(
    (state) => state.pendingClaims
  )

  // action
  const setPendingClaims = NewQuestClaimStore.useStoreActions(
    (actions) => actions.setPendingClaims
  )
  const onLoadingModalChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )
  const onSubmissionModalChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onSubmissionModalChanged
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
        setPendingClaims(pendingClaims.filter((e) => e.id !== claimQuest.id))
        onSubmissionModalChanged(false)
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

  if (claimQuest.status === ClaimedQuestStatus.PENDING) {
    return (
      <BtnSubmitWrap>
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
      </BtnSubmitWrap>
    )
  }

  return (
    <Btn
      onClick={() => onSubmit(ReviewBtnEnum.PENDING)}
      btnType={ReviewBtnEnum.PENDING}
    >
      {'Set as Pending'}
    </Btn>
  )
}

const DetailSubmission: FunctionComponent = () => {
  // Data
  const submisisonModalState = NewQuestClaimStore.useStoreState(
    (state) => state.submissionModal
  )
  const claimQuestActive = NewQuestClaimStore.useStoreState(
    (state) => state.claimQuestActive
  )

  // Actions
  const onSubmissionModalChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onSubmissionModalChanged
  )

  // Handler
  const onCloseModal = () => {
    onSubmissionModalChanged(false)
  }

  return (
    <BaseModal isOpen={submisisonModalState}>
      <ModalBox>
        <ModalContent>
          <MDHead>
            {claimQuestActive.quest?.title}
            <XMarkIcon
              className='w-7 h-7 cursor-pointer'
              onClick={onCloseModal}
            />
          </MDHead>
          <MDBody>
            <MDLeftSide>
              <MDTitle>{'MISSION'}</MDTitle>
              <Gap height={2} />
              <MDDes>
                {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac leo dui. ' +
                  'Sed porttitor augue erat, a hendrerit neque viverra et.'}
              </MDDes>
              <Gap height={2} />
              <MDTitle>{'GUILD'}</MDTitle>
              <Gap height={2} />
              <MDDes>
                {'Nulla ut nibh a metus sollicitudin fermentum. Mauris in sollicitudin nisl,' +
                  ' eget semper justo. Cras convallis tempus ex nec euismod.'}
              </MDDes>
              <Gap height={2} />
              <MDTitle>{'SUBMISSION'}</MDTitle>
              <Gap height={2} />
              <MDDes>
                {'Nulla ut nibh a metus sollicitudin fermentum. Mauris in sollicitudin nisl,' +
                  ' eget semper justo. Cras convallis tempus ex nec euismod.'}
              </MDDes>
              <Gap height={2} />
              <MDDes>
                {'Nulla ut nibh a metus sollicitudin fermentum. Mauris in sollicitudin nisl,' +
                  ' eget semper justo. Cras convallis tempus ex nec euismod.'}
              </MDDes>
            </MDLeftSide>
            <MDRightSide>
              <MDPadding>
                <MDTitle>{'SUBMISSION'}</MDTitle>
                <Gap height={6} />
                <MDInfo>
                  <SInfo>
                    <Image
                      width={40}
                      height={40}
                      src={'/images/dummy/1.svg'}
                      alt={StorageConst.AVATAR_DEFAUL.alt}
                    />
                    <SCol>
                      <SName>{claimQuestActive.user?.name}</SName>
                      <SDes>{'claimed a few seconds ago'}</SDes>
                    </SCol>
                  </SInfo>
                  <STag claimStatus={claimQuestActive.status!}>
                    {ClaimedQuestMap.get(
                      claimQuestActive.status! as ClaimedQuestStatus
                    )}
                  </STag>
                </MDInfo>
                <Gap height={4} />
                <MDDes>
                  {'Nulla ut nibh a metus sollicitudin fermentum. Mauris in sollicitudin nisl,' +
                    ' eget semper justo. Cras convallis tempus ex nec euismod.'}
                </MDDes>{' '}
                <Gap height={4} />
                <EmptyBox />
              </MDPadding>
              <Gap height={4} />
              <Divider />
              <Gap height={4} />
              <MDPadding>
                <MDTitle>{'REVIEW'}</MDTitle>
                <Gap height={4} />
                <MulInputBox rows={3} placeholder='Leave a comment...' />
                <Gap height={8} />
                <Action claimQuest={claimQuestActive} />
              </MDPadding>
            </MDRightSide>
          </MDBody>
        </ModalContent>
      </ModalBox>
    </BaseModal>
  )
}

export default DetailSubmission
