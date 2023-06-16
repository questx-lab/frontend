import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { ActionModal } from '@/admin-portal/modules/referrals/action-modal'
import ReferralStatus from '@/admin-portal/modules/referrals/referral-table/referral-status'
import StorageConst from '@/constants/storage.const'
import AdminReferralStore from '@/store/admin/admin-referral'
import { UserType } from '@/types'
import { CommunityType, ReferralType } from '@/types/community'
import { CircularImage } from '@/widgets/circular-image'
import { HorizontalStartCenter } from '@/widgets/orientation'
import { TextBase } from '@/widgets/text'

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

const Tr = styled.tr<{ index: number }>(({ index }) => {
  const styles = [tw`py-3`]
  if (index === 0) {
    styles.push(tw`border-t border-solid border-gray-300`)
  }

  return styles
})

const MediumTextBase = tw(TextBase)`font-medium`

const PointerHorizontal = tw(HorizontalStartCenter)`cursor-pointer`

const ReferralBody: FC<{
  onClickUser: (user: UserType) => void
  onClickCommunity: (community: CommunityType) => void
}> = ({ onClickUser, onClickCommunity }) => {
  //data
  const referrals = AdminReferralStore.useStoreState((state) => state.referrals)

  if (!referrals) {
    return <></>
  }

  const UserTd: FC<{ referral: ReferralType }> = ({ referral }) => {
    return (
      <Td rowSpan={referral.communities.length}>
        <PointerHorizontal onClick={() => onClickUser(referral.referred_by)}>
          <CircularImage
            width={40}
            height={40}
            src={referral.referred_by.avatar_url || StorageConst.USER_DEFAULT.src}
          />
          <MediumTextBase>{referral.referred_by.name}</MediumTextBase>
        </PointerHorizontal>
      </Td>
    )
  }

  return (
    <>
      <tbody>
        {referrals.map((referral) =>
          referral.communities.map((community: CommunityType, index) => (
            <Tr key={`${community.handle}-${index}`} index={index}>
              {index === 0 && <UserTd referral={referral} />}
              <Td>
                <PointerHorizontal onClick={() => onClickCommunity(community)}>
                  <CircularImage
                    width={40}
                    height={40}
                    src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
                  />
                  <MediumTextBase>{community.display_name}</MediumTextBase>
                </PointerHorizontal>
              </Td>
              <Td highlight={community.discord !== ''}>{community.discord || 'not connect'}</Td>
              <Td highlight={community.twitter !== ''}>{community.twitter || 'not connect'}</Td>
              <ReferralStatus community={community} />
            </Tr>
          ))
        )}
      </tbody>
      <ActionModal />
    </>
  )
}

export default ReferralBody
