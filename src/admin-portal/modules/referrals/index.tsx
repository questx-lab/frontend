import { FunctionComponent, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import CommunityDetailModal from '@/admin-portal/modules/referrals/community-detail'
import UserDetailModal from '@/admin-portal/modules/referrals/user-detail'
import { ReferralActionEnum, ReferralStatusEnum } from '@/admin-portal/types/control-panel-tab'
import StorageConst from '@/constants/storage.const'
import AdminPortalStore from '@/store/local/admin-portal'
import AdminReferralStore from '@/store/local/admin-referral'
import { UserType } from '@/types'
import { CommunityType } from '@/types/community'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import { CircularImage } from '@/widgets/circular-image'
import { Horizontal, HorizontalStartCenter, VerticalFullWidth } from '@/widgets/orientation'
import ReferralTable from '@/widgets/table/referral-table'
import { Text2xl, TextBase } from '@/widgets/text'
import { CheckIcon } from '@heroicons/react/24/outline'

import { ActionModal } from './action-modal'

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

const Th = tw.th`
border-b border-gray-300 bg-gray-100 p-4
`

const GapVertical = tw(VerticalFullWidth)`
  gap-6
  p-6
`

const GapHorizontal = tw(Horizontal)`
  gap-2
`

const SuccessTextBase = tw(TextBase)`text-success`

const MediumTextBase = tw(TextBase)`font-medium`

const PointerHorizontal = tw(HorizontalStartCenter)`cursor-pointer`

const TABLE_HEAD = ['From User', 'Community', 'Discord', 'Twitter', 'Status']

const ReferralStatus: FunctionComponent<{ community: CommunityType }> = ({ community }) => {
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

const ReferralBody: FunctionComponent<{
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

export default function Referral() {
  const [openUserModal, setOpenUserModal] = useState<boolean>(false)
  const [openCommunityModal, setOpenCommunityModal] = useState<boolean>(false)
  const [user, setUser] = useState<UserType>()

  const community = AdminReferralStore.useStoreState((state) => state.community)
  const setCommunity = AdminReferralStore.useStoreActions((action) => action.setCommunity)

  const onClickUser = (user: UserType) => {
    setOpenUserModal(true)
    setUser(user)
  }

  const onClickCommunity = (community: CommunityType) => {
    setOpenCommunityModal(true)
    setCommunity(community)
  }

  const onCloseUserModel = () => {
    setOpenUserModal(false)
  }

  const onCloseCommunityModel = () => {
    setOpenCommunityModal(false)
  }

  return (
    <GapVertical>
      <Text2xl>{'Referral Tracking'}</Text2xl>
      <ReferralTable>
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <Th>{head}</Th>
            ))}
          </tr>
        </thead>
        <ReferralBody onClickUser={onClickUser} onClickCommunity={onClickCommunity} />
      </ReferralTable>
      <UserDetailModal user={user} openModal={openUserModal} onCloseModel={onCloseUserModel} />
      <CommunityDetailModal
        community={community}
        openModal={openCommunityModal}
        onCloseModel={onCloseCommunityModel}
      />
    </GapVertical>
  )
}
