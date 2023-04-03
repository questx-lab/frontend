import { useState } from 'react'

import SidebarCustom from '@/components/layouts/sidebar'
import { Gap } from '@/styles/common.style'
import { Main, Tab, TabSide, Text, Title, Wrap } from '@/styles/home.style'

import PManageMod from './project-management'
import ProjectSettingMod from './project-setting'
import QuestMod from './quests'
import ReviewSubMitMod from './review-submit'

export default function HomeModule() {
  const [tabActive, setTabActive] = useState<number>(0)

  const onChanageTab = (tabNum: number) => {
    if (tabActive !== tabNum) {
      setTabActive(tabNum)
    }
  }

  return (
    <Wrap>
      <SidebarCustom />
      <Main>
        <Title>{'Project Name'}</Title>
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
        {tabActive === 2 && <ProjectSettingMod />}
        {tabActive === 3 && <PManageMod />}
      </Main>
    </Wrap>
  )
}
