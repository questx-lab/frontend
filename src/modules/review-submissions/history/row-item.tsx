import { ChangeEvent, FunctionComponent } from 'react'

import { ClaimedQuestMap, ClaimedQuestStatus } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
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
import { ClaimQuestType } from '@/utils/type'
import { Image } from '@/widgets/image'
import { CheckBox } from '@/widgets/input'
import { HorizontalBetweenCenterFullWidth } from '@/widgets/orientation'
import styled from 'styled-components'
import tw from 'twin.macro'

const Status = styled.div<{ claimStatus?: string }>(
  ({ claimStatus = ClaimedQuestStatus.PENDING }) => [
    claimStatus === ClaimedQuestStatus.ACCEPTED &&
      tw`
  text-sm
  font-medium
  text-success-700
  py-2
  px-3
  rounded-lg
  bg-success-100
  `,
    claimStatus === ClaimedQuestStatus.REJECTED &&
      tw`
  text-sm
  font-medium
  text-danger-700
  py-2
  px-3
  rounded-lg
  bg-danger-100
  `,
  ]
)

const RowItem: FunctionComponent<{
  active: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => void
  claim: ClaimQuestType
}> = ({ active, onChange, claim }) => {
  const onSubmissionModalChanged = NewClaimReviewStore.useStoreActions(
    (actions) => actions.onSubmissionModalChanged
  )

  return (
    <HorizontalBetweenCenterFullWidth>
      <Row active={false}>
        <FullWidth>
          <CheckBox checked={active} type='checkbox' onChange={(value) => onChange(value, claim)} />
          <Details onClick={() => onSubmissionModalChanged(true)}>
            <Title>{claim.quest?.title}</Title>
            <Info>
              <Image
                width={40}
                height={40}
                src={StorageConst.USER_DEFAULT.src}
                alt={StorageConst.USER_DEFAULT.alt}
              />
              <VerticalLeftMargin>
                <Name>{claim.user.name || ''}</Name>
                {
                  // TODO: Display the claim time here.
                  /* <Time>{'claimed a few seconds ago'}</Time> */
                }
              </VerticalLeftMargin>
            </Info>
          </Details>
        </FullWidth>

        <Status claimStatus={claim.status!}>
          {ClaimedQuestMap.get(claim.status! as ClaimedQuestStatus)}
        </Status>
      </Row>
    </HorizontalBetweenCenterFullWidth>
  )
}

export default RowItem
