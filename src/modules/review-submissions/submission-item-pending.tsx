import { ChangeEvent, FunctionComponent, ReactNode } from 'react'

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
} from '@/modules/review-submissions/row-item'
import { NewClaimReviewStore } from '@/store/local/claim-review'
import { ClaimQuestType } from '@/utils/type'
import { Image } from '@/widgets/image'
import { CheckBox } from '@/widgets/input'

const SubmissionItemPending: FunctionComponent<{
  tab: number
  active: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => void
  payload: ClaimQuestType
  actionsButton?: ReactNode
}> = ({ tab, active, onChange, payload, actionsButton: actionButtons }) => {
  // Actions
  const onSubmissionModalChanged = NewClaimReviewStore.useStoreActions(
    (actions) => actions.onSubmissionModalChanged
  )
  const setClaimActive = NewClaimReviewStore.useStoreActions((actions) => actions.setClaimActive)

  // Handler
  const onShowModal = () => {
    onSubmissionModalChanged(true)
  }

  return (
    <Row active={active} onClick={() => setClaimActive(payload)}>
      <FullWidth>
        <CheckBox checked={active} type='checkbox' onChange={(value) => onChange(value, payload)} />
        <Details onClick={onShowModal}>
          <Title>{payload.quest?.title}</Title>
          <Info>
            <Image
              width={40}
              height={40}
              src={StorageConst.USER_DEFAULT.src}
              alt={StorageConst.USER_DEFAULT.alt}
            />
            <VerticalLeftMargin>
              <Name>{payload.user?.name}</Name>
              <Time>{'claimed a few seconds ago'}</Time>
            </VerticalLeftMargin>
          </Info>
        </Details>
      </FullWidth>

      {actionButtons}
      {/* <Action claimQuest={payload} tab={tab} /> */}
    </Row>
  )
}

export default SubmissionItemPending
