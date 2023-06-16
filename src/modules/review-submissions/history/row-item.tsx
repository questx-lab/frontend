import { ChangeEvent, FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { ClaimedQuestMap, ClaimedQuestStatus } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import {
  Details,
  FullWidth,
  Info,
  Name,
  Row,
  Title,
  VerticalLeftMargin,
} from '@/modules/review-submissions/mini-widget'
import { ClaimedSubmit } from '@/modules/review-submissions/pending/row-item'
import ClaimReviewStore from '@/store/local/claim-review'
import { ClaimQuestType } from '@/types'
import { Image } from '@/widgets/image'
import { HorizontalBetweenCenterFullWidth, Vertical } from '@/widgets/orientation'

export const Status = styled.div<{ claimStatus?: string }>(
  ({ claimStatus = ClaimedQuestStatus.PENDING }) => {
    const styles = [
      tw`
        text-sm
        font-medium
        py-2
        px-3
        rounded-lg
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

const RowItem: FC<{
  active: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => void
  claim: ClaimQuestType
}> = ({ active, onChange, claim }) => {
  const onSubmissionModalChanged = ClaimReviewStore.useStoreActions(
    (actions) => actions.setShowClaimDetails
  )
  const setClaimActive = ClaimReviewStore.useStoreActions((actions) => actions.setClaimActive)

  return (
    <Vertical>
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
      <ClaimedSubmit claimQuest={claim} />
    </Vertical>
  )
}

export default RowItem
