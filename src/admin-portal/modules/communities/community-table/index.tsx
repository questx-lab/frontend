import { FC, useState } from 'react'

import tw from 'twin.macro'

import CommunityDetailModal from '@/admin-portal/modules/communities/community-detail'
import CommunityBody from '@/admin-portal/modules/communities/community-table/community-body'
import UserDetailModal from '@/admin-portal/modules/referrals/user-detail'
import AdminCommunityStore from '@/store/admin/community'
import { UserType } from '@/types'
import { CommunityType } from '@/types/community'
import SimpleTable from '@/widgets/table/simple-table'

const Th = tw.th`
  border-b border-gray-300 bg-gray-100 p-4
`

const TABLE_HEAD = [
  'Name',
  'Status',
  'Created By',
  'Date Created',
  'Quests',
  'Members',
  'DAU',
  'Action',
]

const CommunityContent: FC = () => {
  const [openUserModal, setOpenUserModal] = useState<boolean>(false)
  const [openCommunityModal, setOpenCommunityModal] = useState<boolean>(false)
  const [user, setUser] = useState<UserType>()

  const community = AdminCommunityStore.useStoreState((state) => state.community)
  const setCommunity = AdminCommunityStore.useStoreActions((action) => action.setCommunity)

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
      <SimpleTable>
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <Th key={index}>{head}</Th>
            ))}
          </tr>
        </thead>
        <CommunityBody onClickUser={onClickUser} onClickCommunity={onClickCommunity} />
      </SimpleTable>
      <UserDetailModal user={user} openModal={openUserModal} onCloseModel={onCloseUserModel} />
      <CommunityDetailModal
        community={community}
        openModal={openCommunityModal}
        onCloseModel={onCloseCommunityModel}
      />
    </>
  )
}

export default CommunityContent
