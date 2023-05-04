import { ChangeEvent, CSSProperties, FunctionComponent } from 'react'

import Image from 'next/image'

import { ReviewBtnEnum, TabReviewEnum } from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
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

const Action: FunctionComponent<{ submissionType: number }> = ({
  submissionType,
}) => {
  if (submissionType === TabReviewEnum.PENDING) {
    return (
      <PAction>
        <Btn btnType={ReviewBtnEnum.REJECT}>{'Reject'}</Btn>
        <Btn btnType={ReviewBtnEnum.ACCEPT}>{'Accept'}</Btn>
      </PAction>
    )
  }

  return <STag>{'PENDING'}</STag>
}

const SubmissionItem: FunctionComponent<{
  submissionType: number
  active: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>, value: string) => void
  payload: string
  style?: CSSProperties
}> = ({ submissionType, active, onChange, payload, style }) => {
  // Actions
  const onSubmissionModalChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onSubmissionModalChanged
  )

  // Handler
  const onShowModal = () => {
    onSubmissionModalChanged(true)
  }

  return (
    <SRow active={active} style={style}>
      <SubmitItem>
        <PCheckBox
          checked={active}
          type='checkbox'
          onChange={(value) => onChange(value, payload)}
        />
        <SItem onClick={onShowModal}>
          <STextInfo>
            {'Invite 15 fren to join our crew3 🤲' + payload}
          </STextInfo>
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
        </SItem>
      </SubmitItem>
      <Action submissionType={submissionType} />
    </SRow>
  )
}

export default SubmissionItem
