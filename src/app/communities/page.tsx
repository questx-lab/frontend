'use client'

import { Layout } from '@/components/layout'
import ProjectSide from '@/components/sidebar'
import FollowingProject from '@/modules/my-projects/following-project'
import { NewProjectStore } from '@/store/local/project.store'
import { Divider } from '@/styles/common.style'
import { Main, TitleBox, Wrap } from '@/styles/explore.style'
import { TitleCreatedProject } from '@/styles/myProjects.style'

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
