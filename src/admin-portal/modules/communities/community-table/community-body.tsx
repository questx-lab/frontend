import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { ActionModal } from '@/admin-portal/modules/communities/action-modal'
import RowOption from '@/admin-portal/modules/communities/community-table/row-option'
// import CommunityStatus from '@/admin-portal/modules/communities/community-table/community-status'
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

const Tr = styled.tr<{ index: number }>(({ index }) => {
  const styles = [tw`py-3`]
  if (index === 0) {
    styles.push(tw`border-t border-solid border-gray-300`)
  }

  return styles
})

const MediumTextBase = tw(TextBase)`font-medium`

const PointerHorizontal = tw(HorizontalStartCenter)`cursor-pointer`

const CommunityBody: FC<{
  onClickUser: (user: UserType) => void
  onClickCommunity: (community: CommunityType) => void
}> = ({ onClickUser, onClickCommunity }) => {
  //data
  const communities = AdminPortalStore.useStoreState((state) => state.communities)

  console.log('communities', communities)

  if (!communities) {
    return <></>
  }

  const UserTd: FC<{ user: UserType }> = ({ user }) => {
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
  return (
    <>
      <tbody>
        {communities.map((community, index) => (
          <Tr key={`${community.handle}`} index={index}>
            <Td highlight={community.display_name !== ''}>{community.display_name || ''}</Td>
            <Td>{community.status || ''}</Td>
            <UserTd user={community.created_by as UserType} />
            <Td>{community.created_at}</Td>
            <Td>{community.number_of_quests || 0}</Td>
            <Td>{community.followers || 0}</Td>
            <Td>{community.dau || 0}</Td>
            <RowOption community={community} />
          </Tr>
        ))}
      </tbody>
      {/* <ActionModal /> */}
    </>
  )
}

export default CommunityBody
