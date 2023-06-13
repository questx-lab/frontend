import { FC, useState } from 'react'

import tw from 'twin.macro'

import CommunityDetailModal from '@/admin-portal/modules/referrals/community-detail'
import ReferralBody from '@/admin-portal/modules/referrals/referral-table/referral-body'
import UserDetailModal from '@/admin-portal/modules/referrals/user-detail'
import AdminReferralStore from '@/store/local/admin-referral'
import { UserType } from '@/types'
import { CommunityType } from '@/types/community'
import ReferralTable from '@/widgets/table/referral-table'

const Th = tw.th`
border-b border-gray-300 bg-gray-100 p-4
`

const TABLE_HEAD = ['From User', 'Community', 'Discord', 'Twitter', 'Status']

const ReferralContent: FC = () => {
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
    <>
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
    </>
  )
}

export default ReferralContent
