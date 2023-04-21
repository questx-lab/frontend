import { useState } from 'react'

import SidebarCustom from '@/components/layouts/sidebar'
import { useStoreState } from '@/store/store'
import { Gap } from '@/styles/common.style'
import { Main, Tab, TabSide, Text, Title, Wrap } from '@/styles/home.style'

import PManageMod from './project-management'
import ProjectSetting from './project-setting'
import QuestMod from './quests'
import ReviewSubMitMod from './review-submit'

export default function Project() {
  const [tabActive, setTabActive] = useState<number>(0)
  const projectState = useStoreState((state) => state.project.curProject)

  const onChanageTab = (tabNum: number) => {
    if (tabActive !== tabNum) {
      setTabActive(tabNum)
    }
  }

  return (
    <Wrap>
      <SidebarCustom />
      {projectState && (
        <Main>
          <Title>{projectState.name}</Title>
          <Gap />
          <TabSide>
            <Tab isActive={!tabActive} onClick={() => onChanageTab(0)}>
              <Text isActive={!tabActive}>{'Quests'}</Text>
            </Tab>
            <Tab isActive={tabActive === 1} onClick={() => onChanageTab(1)}>
              <Text isActive={tabActive === 1}>{'Review Submission'}</Text>
            </Tab>
            <Tab isActive={tabActive === 2} onClick={() => onChanageTab(2)}>
              <Text isActive={tabActive === 2}>{'Project Settings'}</Text>
            </Tab>
            <Tab isActive={tabActive === 3} onClick={() => onChanageTab(3)}>
              <Text isActive={tabActive === 3}>{'Project Management'}</Text>
            </Tab>
          </TabSide>
          {!tabActive && <QuestMod />}
          {tabActive === 1 && <ReviewSubMitMod />}
          {tabActive === 2 && <ProjectSetting />}
          {tabActive === 3 && <PManageMod />}
        </Main>
      )}
    </Wrap>
  )
}
