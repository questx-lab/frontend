'use client'

import { useState } from 'react'

import { Tab, TabSide, Text, Wrap } from '@/styles/myProjects.style'

import CreatedProjectModule from './createdProject'

export default function MyProjectsMod() {
  const [tabActive, setTabActive] = useState<number>(0)

  const onChanageTab = (tabNum: number) => {
    if (tabActive !== tabNum) {
      setTabActive(tabNum)
    }
  }

  return (
    <Wrap>
      <TabSide>
        <Tab isActive={!tabActive} onClick={() => onChanageTab(0)}>
          <Text isActive={!tabActive}>{'Following Projects'}</Text>
        </Tab>
        <Tab isActive={tabActive === 1} onClick={() => onChanageTab(1)}>
          <Text isActive={tabActive === 1}>{'Created Projects'}</Text>
        </Tab>
      </TabSide>
      {tabActive === 1 && <CreatedProjectModule />}
    </Wrap>
  )
}
