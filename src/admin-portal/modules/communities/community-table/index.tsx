import { FC, useState } from 'react'

import tw from 'twin.macro'

import CommunityBody from '@/admin-portal/modules/communities/community-table/community-body'
import UserDetailModal from '@/admin-portal/modules/referrals/user-detail'
import AdminPortalStore from '@/store/local/admin-portal'
import { UserType } from '@/types'
import { CommunityType } from '@/types/community'
import ReferralTable from '@/widgets/table/referral-table'

const Th = tw.th`
  border-b border-gray-300 bg-gray-100 p-4
`

const TABLE_HEAD = ['Name', 'Status', 'Owner', 'Date Created', 'Quests', 'Members', 'DAU', 'Action']

const CommunityContent: FC = () => {
  const [openUserModal, setOpenUserModal] = useState<boolean>(false)
  const [openCommunityModal, setOpenCommunityModal] = useState<boolean>(false)
  const [user, setUser] = useState<UserType>()

  const communities = AdminPortalStore.useStoreState((state) => state.communities)

  // const setCommunity = AdminPortalStore.useStoreActions((action) => action.setCommunity)

  const onClickUser = (user: UserType) => {
    setOpenUserModal(true)
    setUser(user)
  }

  const onClickCommunity = (community: CommunityType) => {
    setOpenCommunityModal(true)
    // setCommunity(community)
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
            {TABLE_HEAD.map((head, index) => (
              <Th key={index}>{head}</Th>
            ))}
          </tr>
        </thead>
        <CommunityBody onClickUser={onClickUser} onClickCommunity={onClickCommunity} />
      </ReferralTable>
      <UserDetailModal user={user} openModal={openUserModal} onCloseModel={onCloseUserModel} />
      {/* <CommunityDetailModal
        community={community}
        openModal={openCommunityModal}
        onCloseModel={onCloseCommunityModel}
      /> */}
    </>
  )
}

export default CommunityContent
