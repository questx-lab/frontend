import { FunctionComponent } from 'react'

import Image from 'next/image'

import { ReviewBtnEnum } from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
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
import BaseModal from '@/widgets/base-modal'
import { XMarkIcon } from '@heroicons/react/24/outline'

const DetailSubmission: FunctionComponent = () => {
  // Data
  const submisisonModalState = NewQuestStore.useStoreState(
    (state) => state.submissionModal
  )

  // Actions
  const onSubmissionModalChanged = NewQuestStore.useStoreActions(
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
            {'Invite 2 fren to join our crew3 🤲'}
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
                      <SName>{'alim_marcus'}</SName>
                      <SDes>{'claimed a few seconds ago'}</SDes>
                    </SCol>
                  </SInfo>
                  <STag>{'PENDING'}</STag>
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
                <BtnSubmitWrap>
                  <Btn btnType={ReviewBtnEnum.REJECT}>{'Reject'}</Btn>
                  <Btn btnType={ReviewBtnEnum.ACCEPT}>{'Accept'}</Btn>
                </BtnSubmitWrap>
              </MDPadding>
            </MDRightSide>
          </MDBody>
        </ModalContent>
      </ModalBox>
    </BaseModal>
  )
}

export default DetailSubmission
