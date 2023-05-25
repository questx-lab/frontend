import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { BoxContent, CircleRouded, Wrap } from '@/styles/sidebar.style'
import { CollaboratorType, CommunityType } from '@/utils/type'
import { Tooltip } from '@material-tailwind/react'
import { IMAGES_SOURCE } from '@/constants/images'

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

const RenderFollowItems: FunctionComponent<{
  projects: CommunityType[]
  activeCommunityId: string | undefined
}> = ({ projects, activeCommunityId }) => {
  const router = useRouter()
  const listItems =
    projects &&
    projects.map((community) => (
      <Tooltip key={community.id} content={community.name} placement='right'>
        <ActiveAvatar active={community.id === activeCommunityId}>
          <CircleRouded
            onClick={() => router.push(RouterConst.PROJECT + community.id)}
            width={45}
            height={45}
            src={community.logo_url || IMAGES_SOURCE.community_default}
            alt='logo'
          />
        </ActiveAvatar>
      </Tooltip>
    ))

  if (!projects.length) {
    return <></>
  }

  return <BoxContent>{listItems}</BoxContent>
}

const RenderCollabItems: FunctionComponent<{
  collaborator: CollaboratorType[]
  activeCommunityId: string | undefined
}> = ({ collaborator, activeCommunityId }) => {
  const router = useRouter()
  const listItems =
    collaborator &&
    collaborator.map((community) => (
      <Tooltip
        key={community.community_id}
        content={community.community.name}
        placement='right'
      >
        <ActiveAvatar active={community.community_id === activeCommunityId}>
          <CircleRouded
            onClick={() =>
              router.push(RouterConst.PROJECT + community.community_id)
            }
            width={45}
            height={45}
            src={
              community.community.logo_url || IMAGES_SOURCE.community_default
            }
            alt='logo'
          />
        </ActiveAvatar>
      </Tooltip>
    ))

  if (!collaborator.length) {
    return <></>
  }

  return <BoxContent>{listItems}</BoxContent>
}
const ProjectSide: FunctionComponent<{
  activeCommunityId: string | undefined
}> = ({ activeCommunityId }) => {
  const projectsFollowing: CommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.projectsFollowing
  )
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  const projectCollab: CollaboratorType[] = useStoreState<GlobalStoreModel>(
    (state) => state.projectCollab
  )

  if (!user || (projectsFollowing.length === 0 && projectCollab.length === 0)) {
    return <></>
  }

  return (
    <Wrap>
      <RenderCollabItems
        activeCommunityId={activeCommunityId}
        collaborator={projectCollab}
      />
      <RenderFollowItems
        activeCommunityId={activeCommunityId}
        projects={projectsFollowing}
      />
    </Wrap>
  )
}

export default ProjectSide
