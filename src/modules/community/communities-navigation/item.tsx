import { FunctionComponent } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { communityRoute } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import { CollaboratorType } from '@/types'
import { CommunityType } from '@/types/community'
import { CircularImage } from '@/widgets/circular-image'
import { Tooltip } from '@material-tailwind/react'

const ActiveAvatar = styled.div<{ active?: boolean }>(({ active = false }) => [
  active
    ? tw`
    rounded-full
    p-1
    border-2
    border-solid
    border-primary
  `
    : tw``,
])

export const Item: FunctionComponent<{
  collaboration: CollaboratorType
  active: boolean
}> = ({ collaboration, active }) => {
  // hook
  const navigate = useNavigate()

  return (
    <>
      <Tooltip
        key={collaboration.community.handle}
        content={collaboration.community.display_name}
        placement='right'
      >
        <ActiveAvatar active={active}>
          <CircularImage
            onClick={() => navigate(communityRoute(collaboration.community.handle))}
            width={45}
            height={45}
            src={collaboration.community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
            alt='community'
          />
        </ActiveAvatar>
      </Tooltip>
    </>
  )
}

const FollowItem: FunctionComponent<{
  community: CommunityType
  active: boolean
}> = ({ community, active }) => {
  // hook
  const navigate = useNavigate()

  return (
    <>
      <Tooltip key={community.handle} content={community.display_name} placement='right'>
        <ActiveAvatar active={active}>
          <CircularImage
            onClick={() => navigate(communityRoute(community.handle))}
            width={45}
            height={45}
            src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
            alt='community'
          />
        </ActiveAvatar>
      </Tooltip>
    </>
  )
}

export default FollowItem
