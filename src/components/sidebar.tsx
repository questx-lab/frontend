import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { Divider } from '@/styles/common.style'
import { BoxContent, CircleRouded, Wrap } from '@/styles/sidebar.style'
import { CollaboratorType, ProjectType } from '@/types/project.type'
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
  projects: ProjectType[]
  projectId?: string
}> = ({ projects, projectId }) => {
  const router = useRouter()
  const listItems =
    projects &&
    projects.map((e) => (
      <Tooltip key={e.id} content={e.name} placement='right'>
        <ActiveAvatar active={e.id === projectId}>
          <CircleRouded
            onClick={() => router.push(RouterConst.PROJECT + e.id)}
            width={45}
            height={45}
            src={'/images/dummy/4.svg'}
            alt='logo'
          />
        </ActiveAvatar>
      </Tooltip>
    ))

  return <BoxContent>{listItems}</BoxContent>
}

const RenderCollabItems: FunctionComponent<{
  collaborator: CollaboratorType[]
  projectId?: string
}> = ({ collaborator, projectId }) => {
  const router = useRouter()
  const listItems =
    collaborator &&
    collaborator.map((e) => (
      <Tooltip key={e.project_id} content={e.project.name} placement='right'>
        <ActiveAvatar active={e.project_id === projectId}>
          <CircleRouded
            onClick={() => router.push(RouterConst.PROJECT + e.project_id)}
            width={45}
            height={45}
            src={'/images/dummy/4.svg'}
            alt='logo'
          />
        </ActiveAvatar>
      </Tooltip>
    ))

  return <BoxContent>{listItems}</BoxContent>
}
const ProjectSide: FunctionComponent<{ projectId?: string }> = ({
  projectId,
}) => {
  const projectsFollowing = useStoreState<GlobalStoreModel>(
    (state) => state.projectsFollowing
  )
  const isLogin = useStoreState<GlobalStoreModel>((state) => state.isLogin)

  const projectCollab = useStoreState<GlobalStoreModel>(
    (state) => state.projectCollab
  )

  return (
    <Wrap isShow={isLogin}>
      <RenderCollabItems projectId={projectId} collaborator={projectCollab} />
      <Divider />
      <RenderFollowItems projectId={projectId} projects={projectsFollowing} />
    </Wrap>
  )
}

export default ProjectSide
