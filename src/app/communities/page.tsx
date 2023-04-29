'use client'

import { useState } from 'react'

import { Layout } from '@/components/layout'
import CreatedProject from '@/modules/my-projects/created-project'
import FollowingProject from '@/modules/my-projects/following-project'
import { NewProjectStore } from '@/store/local/project.store'
import { Tab, TabSide, Text, Wrap } from '@/styles/myProjects.style'

export default function MyProjects() {
  const [tabActive, setTabActive] = useState<number>(0)

  const onChanageTab = (tabNum: number) => {
    if (tabActive !== tabNum) {
      setTabActive(tabNum)
    }
  }
  return (
    <Layout>
      <header>
        <title>{'My Projects'}</title>
      </header>
      <Wrap>
        <TabSide>
          <Tab isActive={!tabActive} onClick={() => onChanageTab(0)}>
            <Text isActive={!tabActive}>{'Following Projects'}</Text>
          </Tab>
          <Tab isActive={tabActive === 1} onClick={() => onChanageTab(1)}>
            <Text isActive={tabActive === 1}>{'Created Projects'}</Text>
          </Tab>
        </TabSide>
        <NewProjectStore.Provider>
          {tabActive === 1 && <CreatedProject />}
          {tabActive === 0 && <FollowingProject />}
        </NewProjectStore.Provider>
      </Wrap>
    </Layout>
  )
}
