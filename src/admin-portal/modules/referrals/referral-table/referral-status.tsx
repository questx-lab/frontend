import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { ReferralActionEnum, ReferralStatusEnum } from '@/admin-portal/types/control-panel-tab'
import AdminReferralStore from '@/store/admin/referral'
import { CommunityType } from '@/types/community'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import { Horizontal } from '@/widgets/orientation'
import { TextBase } from '@/widgets/text'
import { CheckIcon } from '@heroicons/react/24/outline'

const Td = styled.td<{ highlight?: boolean }>(({ highlight = false }) => {
  const styles = [
    tw`
  p-4
  font-normal
  text-base
  text-gray-500
`,
  ]
  if (highlight) {
    styles.push(tw`font-medium text-info`)
  }

  return styles
})

const GapHorizontal = tw(Horizontal)`
  gap-2
`

const SuccessTextBase = tw(TextBase)`text-success`

const ReferralStatus: FC<{ community: CommunityType }> = ({ community }) => {
  const setAction = AdminReferralStore.useStoreActions((action) => action.setAction)
  const setCommunity = AdminReferralStore.useStoreActions((action) => action.setCommunity)
  const setShowActiveModal = AdminReferralStore.useStoreActions(
    (action) => action.setShowActiveModal
  )

  const onActionSubmit = (action: string) => {
    setCommunity(community)
    setAction(action)
    setShowActiveModal(true)
  }

  if (community.referral_status === ReferralStatusEnum.PENDING) {
    return (
      <Td>
        <GapHorizontal>
          <PositiveButton
            onClick={() => onActionSubmit(ReferralActionEnum.REJECT)}
            type={ButtonTypeEnum.DANGEROUS_BORDER}
          >
            {'Reject'}
          </PositiveButton>
          <PositiveButton
            onClick={() => onActionSubmit(ReferralActionEnum.APPROVE)}
            type={ButtonTypeEnum.POSITVE_BORDER}
          >
            {'Approve'}
          </PositiveButton>
        </GapHorizontal>
      </Td>
    )
  }

  if (community.referral_status === ReferralStatusEnum.CLAIMABLE) {
    return (
      <Td>
        <GapHorizontal>
          <CheckIcon className='w-7 h-7 text-success' />
          <SuccessTextBase>{ReferralStatusEnum.CLAIMABLE}</SuccessTextBase>
        </GapHorizontal>
      </Td>
    )
  }

  return <Td>{community.referral_status}</Td>
}

export default ReferralStatus
