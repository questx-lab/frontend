'use client'

import { useState } from 'react'

import {
  TabElement,
  TabSide,
  TextTabElement,
  Wrap,
} from '@/styles/myProjects.style'

import CreatedProjectModule from './createdProject'

export default function MyProjectsModule() {
  const [tabActive, setTabActive] = useState<number>(0)

  const onChanageTab = (tabNum: number) => {
    if (tabActive !== tabNum) {
      setTabActive(tabNum)
    }
  }

  return (
    <Wrap>
      <TabSide>
        <TabElement isActive={!tabActive} onClick={() => onChanageTab(0)}>
          <TextTabElement isActive={!tabActive}>
            {'Following Projects'}
          </TextTabElement>
        </TabElement>
        <TabElement isActive={tabActive === 1} onClick={() => onChanageTab(1)}>
          <TextTabElement isActive={tabActive === 1}>
            {'Created Projects'}
          </TextTabElement>
        </TabElement>
      </TabSide>
      {tabActive === 1 && <CreatedProjectModule />}
    </Wrap>
  )
}
