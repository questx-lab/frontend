import { FC } from 'react'

import { useStoreActions } from 'easy-peasy'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { communityRoute } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import { GlobalStoreModel } from '@/store/store'
import { CollaboratorType } from '@/types'
import { CommunityType } from '@/types/community'
import { CircularImage } from '@/widgets/circular-image'
import { Tooltip } from '@material-tailwind/react'

const ActiveAvatar = styled.div<{ active?: boolean }>(({ active = false }) => [
  active
    ? tw`
    rounded-full
    p-[2px]
    border-2
    border-solid
    border-primary
  `
    : tw``,
])

export const Item: FC<{
  collaboration: CollaboratorType
  active: boolean
}> = ({ collaboration, active }) => {
  // hook
  const navigate = useNavigate()
  // action
  const setShowNavigationDrawer = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowNavigationDrawer
  )

  return (
    <>
      <Tooltip
        key={collaboration.community.handle}
        content={collaboration.community.display_name}
        placement='right'
      >
        <ActiveAvatar active={active}>
          <CircularImage
            onClick={() => {
              if (isMobile) {
                setShowNavigationDrawer(false)
              }
              navigate(communityRoute(collaboration.community.handle))
            }}
            width={40}
            height={40}
            src={collaboration.community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
            alt='community'
          />
        </ActiveAvatar>
      </Tooltip>
    </>
  )
}

const FollowItem: FC<{
  community: CommunityType
  active: boolean
}> = ({ community, active }) => {
  // hook
  const navigate = useNavigate()
  // action
  const setShowNavigationDrawer = useStoreActions<GlobalStoreModel>(
    (action) => action.setShowNavigationDrawer
  )

  return (
    <>
      <Tooltip key={community.handle} content={community.display_name} placement='right'>
        <ActiveAvatar active={active}>
          <CircularImage
            onClick={() => {
              if (isMobile) {
                setShowNavigationDrawer(false)
              }
              navigate(communityRoute(community.handle))
            }}
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
