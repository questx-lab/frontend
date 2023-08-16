import { FC, ReactNode, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { ActionModal } from '@/admin-portal/modules/communities/action-modal'
import CommunityDetailModal from '@/admin-portal/modules/communities/community-detail'
import RowOption from '@/admin-portal/modules/communities/community-table/row-option'
import UserDetailModal from '@/admin-portal/modules/referrals/user-detail'
import { CommunityStatusEnum } from '@/admin-portal/types/control-panel-tab'
import { ClaimedQuestStatus } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { Status } from '@/modules/review-submissions/history/row-item'
import AdminCommunityStore from '@/store/admin/community'
import { UserType } from '@/types'
import { CommunityType } from '@/types/community'
import { convertTimeToShow } from '@/utils/time'
import { UserAvatar } from '@/widgets/avatar'
import { CircularImage } from '@/widgets/circular-image'
import { Horizontal, HorizontalStartCenter } from '@/widgets/orientation'
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
  const styles = [tw`py-3 cursor-pointer hover:bg-gray-100`]
  if (index === 0) {
    styles.push(tw`border-t border-solid border-gray-300`)
  }

  return styles
})

const MediumTextBase = tw(TextBase)`font-medium`

const PointerHorizontal = tw(HorizontalStartCenter)`cursor-pointer`

const CommunityTd: FC<{
  community: CommunityType
  onClickCommunity: (community: CommunityType) => void
}> = ({ community, onClickCommunity }) => {
  return (
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
  )
}

const OwnerTd: FC<{ owner?: UserType; onClickUser: (owner: UserType) => void }> = ({
  owner,
  onClickUser,
}) => {
  if (!owner) {
    return <Td>Cannot find owner</Td>
  }

  return (
    <Td>
      <PointerHorizontal onClick={() => onClickUser(owner)}>
        <UserAvatar size={40} user={owner} />
        <MediumTextBase>{owner.name}</MediumTextBase>
      </PointerHorizontal>
    </Td>
  )
}

const StatusTd: FC<{ status: string }> = ({ status }) => {
  let inner: ReactNode = status
  switch (status) {
    case CommunityStatusEnum.PENDING:
      inner = (
        <Status claimStatus={ClaimedQuestStatus.PENDING}>{CommunityStatusEnum.PENDING}</Status>
      )
      break
    case CommunityStatusEnum.ACTIVE:
      inner = (
        <Status claimStatus={ClaimedQuestStatus.ACCEPTED}>{CommunityStatusEnum.ACTIVE}</Status>
      )
      break
  }

  return (
    <Td>
      <Horizontal>{inner}</Horizontal>
    </Td>
  )
}

const CommunityRow: FC<{
  community: CommunityType
  index: number
}> = ({ community, index }) => {
  const [openUserModal, setOpenUserModal] = useState<boolean>(false)
  const [openCommunityModal, setOpenCommunityModal] = useState<boolean>(false)

  const onCloseUserModel = () => {
    setOpenUserModal(false)
  }

  return (
    <Tr key={`${community.handle}`} index={index}>
      <CommunityTd community={community} onClickCommunity={() => setOpenCommunityModal(true)} />
      <StatusTd status={community.status || ''} />
      <OwnerTd owner={community.owner} onClickUser={() => setOpenUserModal(true)} />
      <Td>{convertTimeToShow(community.created_at)}</Td>
      <Td>{community.owner_email || ''}</Td>
      <Td>{community.followers || 0}</Td>
      <Td>{community.dau || 0}</Td>
      <RowOption community={community} />
      <UserDetailModal
        owner={community?.owner}
        openModal={openUserModal}
        onCloseModel={onCloseUserModel}
      />
      <CommunityDetailModal
        community={community}
        openModal={openCommunityModal}
        onCloseModel={() => setOpenCommunityModal(false)}
      />
    </Tr>
  )
}

const CommunityBody: FC = () => {
  //data
  const communities = AdminCommunityStore.useStoreState((state) => state.communities)
  if (!communities) {
    return <></>
  }

  return (
    <>
      <tbody>
        {communities.map((community, index) => (
          <CommunityRow community={community} index={index} />
        ))}
      </tbody>
      <ActionModal />
    </>
  )
}

export default CommunityBody
