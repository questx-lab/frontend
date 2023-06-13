import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { ActionModal } from '@/admin-portal/modules/referrals/action-modal'
import ReferralStatus from '@/admin-portal/modules/referrals/referral-table/referral-status'
import StorageConst from '@/constants/storage.const'
import AdminPortalStore from '@/store/local/admin-portal'
import { UserType } from '@/types'
import { CommunityType } from '@/types/community'
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

const MediumTextBase = tw(TextBase)`font-medium`

const PointerHorizontal = tw(HorizontalStartCenter)`cursor-pointer`

const ReferralBody: FC<{
  onClickUser: (user: UserType) => void
  onClickCommunity: (community: CommunityType) => void
}> = ({ onClickUser, onClickCommunity }) => {
  //data
  const referrals = AdminPortalStore.useStoreState((state) => state.referrals)

  if (!referrals) {
    return <></>
  }

  return (
    <>
      <tbody>
        {referrals.map((referral) =>
          referral.communities.map((community, index) => (
            <tr
              key={index}
              className={`py-3 ${index === 0 ? 'border-t border-solid border-gray-300' : ''}`}
            >
              {index === 0 ? (
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
              ) : null}
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
            </tr>
          ))
        )}
      </tbody>
      <ActionModal />
    </>
  )
}

export default ReferralBody
