'use client'

import { FunctionComponent } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import { Layout } from '@/components/layout'
import ProjectBox from '@/modules/project/project-box'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types/account.type'
import { ProjectType } from '@/types/project.type'
import { EnvVariables } from '@/constants/env.const'
import { Vertical } from '@/widgets/orientation'

const Wrap = tw(Vertical)`
  min-h-screen
  pt-[70px]
`

const Main = tw(Vertical)`
  pt-8
  pb-[30px]
  px-16
  gap-4
`

const WrapProjects = tw.div`
  grid
  grid-cols-4
  gap-4
  max-2xl:grid-cols-3
  max-xl:grid-cols-2
  max-sm:grid-cols-1
`

const TitleBox = tw.div`
  w-full
  flex
  justify-center
  items-center
  text-2xl
  font-medium
  text-gray-900
`

export default function Home() {
  // data
  const projectsFollowing: ProjectType[] = useStoreState<GlobalStoreModel>(
    (state) => state.projectsFollowing
  )
  const user: UserType = useStoreState<GlobalStoreModel>((state) => state.user)

  const renderProject =
    projectsFollowing &&
    projectsFollowing.map((e) => <ProjectBox key={e.id} project={e} />)

  const Title: FunctionComponent = () => {
    if (user && user.name) {
      return <TitleBox>{`👋 Hi, ${user && user.name}`}</TitleBox>
    }

    return <></>
  }

  return (
    <Layout>
      <header>
        <title>{'Home Page'}</title>
      </header>
      <Wrap>
        <Main>
          <Title />
          <WrapProjects>{renderProject}</WrapProjects>
        </Main>
      </Wrap>
    </Layout>
  )
}
