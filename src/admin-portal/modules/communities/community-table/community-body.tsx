import { FC, ReactNode, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { ActionModal } from '@/admin-portal/modules/communities/action-modal'
import RowOption from '@/admin-portal/modules/communities/community-table/row-option'
import { getUserByIdApi } from '@/api/user'
import { ClaimedQuestStatus } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { Status } from '@/modules/review-submissions/history/row-item'
import AdminCommunityStore from '@/store/admin/community'
import { UserType } from '@/types'
import { CommunityType } from '@/types/community'
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
  const styles = [tw`py-3`]
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

const UserTd: FC<{ userId: string; onClickUser: (userId: UserType) => void }> = ({
  userId,
  onClickUser,
}) => {
  const [user, setUser] = useState<UserType>({} as UserType)
  const fetchUser = async () => {
    try {
      const result = await getUserByIdApi(userId)

      if (result.error) {
        toast.error(result.error)
      }
      if (result.code === 0 && result.data) setUser(result.data)
    } catch (error) {}
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <Td>
      <PointerHorizontal onClick={() => onClickUser(user)}>
        <CircularImage
          width={40}
          height={40}
          src={user.avatar_url || StorageConst.USER_DEFAULT.src}
        />
        <MediumTextBase>{user.name}</MediumTextBase>
      </PointerHorizontal>
    </Td>
  )
}

const StatusTd: FC<{ status: string }> = ({ status }) => {
  let inner: ReactNode = status
  switch (status) {
    case 'pending':
      inner = <Status claimStatus={ClaimedQuestStatus.PENDING}>Pending</Status>
      break
  }

  return (
    <Td>
      <Horizontal>{inner}</Horizontal>
    </Td>
  )
}

const CommunityBody: FC<{
  onClickUser: (userId: UserType) => void
  onClickCommunity: (community: CommunityType) => void
}> = ({ onClickUser, onClickCommunity }) => {
  //data
  const communities = AdminCommunityStore.useStoreState((state) => state.communities)

  if (!communities) {
    return <></>
  }

  return (
    <>
      <tbody>
        {communities.map((community, index) => (
          <Tr key={`${community.handle}`} index={index}>
            <CommunityTd community={community} onClickCommunity={onClickCommunity} />
            <StatusTd status={community.status || ''} />
            <UserTd userId={community.created_by || ''} onClickUser={onClickUser} />
            <Td>{community.created_at}</Td>
            <Td>{community.number_of_quests || 0}</Td>
            <Td>{community.followers || 0}</Td>
            <Td>{community.dau || 0}</Td>
            <RowOption community={community} />
          </Tr>
        ))}
      </tbody>
      <ActionModal />
    </>
  )
}

export default CommunityBody