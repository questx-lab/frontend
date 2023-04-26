'use client'

import { useState } from 'react'

import Layout from '@/components/layouts/layout'
import CreatedProject from '@/modules/my-projects/createdProject'
import FollowingProject from '@/modules/my-projects/followingProject'
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
        {tabActive === 1 && <CreatedProject />}
        {tabActive === 0 && <FollowingProject />}
      </Wrap>
    </Layout>
  )
}
