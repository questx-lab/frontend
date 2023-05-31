import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import tw from 'twin.macro'

import { IMAGES_SOURCE } from '@/constants/images'
import { RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { BoxContent, CircleRouded, Wrap } from '@/styles/sidebar.style'
import { CollaboratorType, CommunityType } from '@/utils/type'
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

const RenderFollowItems: FunctionComponent<{
  projects: CommunityType[]
  activeCommunityHandle: string | undefined
}> = ({ projects, activeCommunityHandle }) => {
  const router = useRouter()
  const listItems =
    projects &&
    projects.map((community) => (
      <Tooltip
        key={community.handle}
        content={community.display_name}
        placement='right'
      >
        <ActiveAvatar active={community.handle === activeCommunityHandle}>
          <CircleRouded
            onClick={() => router.push(RouterConst.PROJECT + community.handle)}
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
  activeCommunityHandle: string | undefined
}> = ({ collaborator, activeCommunityHandle }) => {
  const router = useRouter()
  const listItems =
    collaborator &&
    collaborator.map((collaboration) => (
      <Tooltip
        key={collaboration.community.handle}
        content={collaboration.community.display_name}
        placement='right'
      >
        <ActiveAvatar
          active={collaboration.community.handle === activeCommunityHandle}
        >
          <CircleRouded
            onClick={() =>
              router.push(RouterConst.PROJECT + collaboration.community.handle)
            }
            width={45}
            height={45}
            src={
              collaboration.community.logo_url ||
              IMAGES_SOURCE.community_default
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
  activeCommunityHandle: string | undefined
}> = ({ activeCommunityHandle }) => {
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
        activeCommunityHandle={activeCommunityHandle}
        collaborator={projectCollab}
      />
      <RenderFollowItems
        activeCommunityHandle={activeCommunityHandle}
        projects={projectsFollowing}
      />
    </Wrap>
  )
}

export default ProjectSide
