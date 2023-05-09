import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import { useRouter } from 'next/navigation'

import { RouterConst } from '@/constants/router.const'
import { GlobalStoreModel } from '@/store/store'
import { Divider } from '@/styles/common.style'
import { BoxContent, CircleRouded, Wrap } from '@/styles/sidebar.style'
import { ProjectType } from '@/types/project.type'
import { Tooltip } from '@material-tailwind/react'

const RenderItems: FunctionComponent<{ projects: ProjectType[] }> = ({
  projects,
}) => {
  const router = useRouter()
  const listItems =
    projects &&
    projects.map((e) => (
      <Tooltip key={e.id} content={e.name} placement='right'>
        <CircleRouded
          onClick={() => router.push(RouterConst.PROJECT + e.id)}
          width={45}
          height={45}
          src={'/images/dummy/4.svg'}
          alt='logo'
        />
      </Tooltip>
    ))

  return <BoxContent>{listItems}</BoxContent>
}

export default function ProjectSide() {
  const projectsFollowing = useStoreState<GlobalStoreModel>(
    (state) => state.projectsFollowing
  )
  const isLogin = useStoreState<GlobalStoreModel>((state) => state.isLogin)

  const myProjects = useStoreState<GlobalStoreModel>(
    (state) => state.myProjects
  )

  return (
    <Wrap isShow={isLogin}>
      <RenderItems projects={myProjects} />
      <Divider />
      <RenderItems projects={projectsFollowing} />
    </Wrap>
  )
}
