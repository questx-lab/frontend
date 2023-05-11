'use client'
import tw from 'twin.macro'

import { Layout } from '@/components/layout'
import ProjectSide from '@/components/sidebar'
import FollowingProject from '@/modules/my-projects/following-project'
import { NewProjectStore } from '@/store/local/project.store'
import { Divider } from '@/styles/common.style'
import { TitleCreatedProject } from '@/styles/myProjects.style'

const Wrap = tw.div`
  flex
  flex-col
  min-h-screen
  pt-[70px]
`

const Main = tw.div`
  flex
  flex-col
  px-[120px]
  pb-[30px]
  max-xl:px-[100px]
`

const TitleBox = tw.div`
  px-[120px]
  py-6
  max-xl:px-[100px]
`

export default function MyProjects() {
  return (
    <Layout>
      <header>
        <title>{'My Projects'}</title>
      </header>
      <Wrap>
        <ProjectSide />
        <TitleBox>
          <TitleCreatedProject>{'👋 Communities'}</TitleCreatedProject>
        </TitleBox>
        <Divider />
        <Main>
          <NewProjectStore.Provider>
            <FollowingProject />
          </NewProjectStore.Provider>
        </Main>
      </Wrap>
    </Layout>
  )
}
