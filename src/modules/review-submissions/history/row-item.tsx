import { ChangeEvent, FC, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { ClaimedQuestMap, ClaimedQuestStatus } from '@/constants/common.const'
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
import { ClaimedSubmit } from '@/modules/review-submissions/pending/row-item'
import ViewDetailModal from '@/modules/review-submissions/view-detail'
import ClaimReviewStore from '@/store/local/claim-review'
import { ClaimQuestType } from '@/types'
import { UserAvatar } from '@/widgets/avatar'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import { HorizontalBetweenCenterFullWidth, Vertical } from '@/widgets/orientation'

export const Status = styled.div<{ claimStatus?: string }>(
  ({ claimStatus = ClaimedQuestStatus.PENDING }) => {
    const styles = [
      tw`
        text-sm
        font-medium
        py-3
        rounded-lg
        w-full
        flex
        justify-center
        items-center
    `,
    ]

    switch (claimStatus) {
      case ClaimedQuestStatus.ACCEPTED:
        styles.push(tw`
          text-success-700
          bg-success-100
        `)
        break

      case ClaimedQuestStatus.REJECTED:
        styles.push(tw`
          text-danger-700
          bg-danger-100
        `)
        break

      case ClaimedQuestStatus.PENDING:
        styles.push(tw`
            text-warning-700
            bg-warning-100
          `)
        break
    }

    return styles
  }
)

const GapVertical = tw(Vertical)`w-[150px] gap-2`

const RowItem: FC<{
  active: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => void
  claim: ClaimQuestType
}> = ({ active, onChange, claim }) => {
  const [viewDetailModal, setViewDetailModal] = useState<boolean>(false)
  const onSubmissionModalChanged = ClaimReviewStore.useStoreActions(
    (actions) => actions.setShowClaimDetails
  )
  const setClaimActive = ClaimReviewStore.useStoreActions((actions) => actions.setClaimActive)

  return (
    <VerticalItem active={false}>
      <HorizontalBetweenCenterFullWidth>
        <Row>
          <FullWidth>
            <Details
              onClick={() => {
                onSubmissionModalChanged(true)
                setClaimActive(claim)
              }}
            >
              <Title>{claim.quest?.title}</Title>
              <Info>
                <UserAvatar user={claim.user} size={35} />
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

          <GapVertical>
            <Status claimStatus={claim.status!}>
              {ClaimedQuestMap.get(claim.status! as ClaimedQuestStatus)}
            </Status>
            <PositiveButton onClick={() => setViewDetailModal(true)} type={ButtonTypeEnum.WARNING}>
              {'View Detail'}
            </PositiveButton>
          </GapVertical>
          <ViewDetailModal
            isOpen={viewDetailModal}
            onCloseModal={() => setViewDetailModal(false)}
            claimQuest={claim}
          />
        </Row>
      </HorizontalBetweenCenterFullWidth>
      <ClaimedSubmit claimQuest={claim} />
    </VerticalItem>
  )
}

export default RowItem
