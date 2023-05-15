'use client'

import { Layout } from '@/components/layout'
import ProjectSide from '@/components/sidebar'
import { QuestCard } from '@/modules/project/quest-card'
import { Gap } from '@/styles/common.style'
import {
  Description,
  FilterBox,
  Main,
  Title,
  Wrap,
  WrapQuestboard,
} from '@/styles/questboard.style'
import { QuestType } from '@/types/project.type'

export default function Questboard() {
  const handleOnClick = (quest: QuestType) => {}

  const dummyQuest = {}

  const listQuestboards = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => (
    <QuestCard
      key={i}
      quest={dummyQuest}
      isTemplate={false}
      manage={true}
      onClick={handleOnClick}
    />
  ))

  return (
    <Layout>
      <header>
        <title>{'Questboard'}</title>
      </header>
      <Wrap>
        <ProjectSide />
        <Main>
          <Title>{'Questboard (Show all Quests)'}</Title>
          <Gap />
          <Description>
            {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sem eros, scelerisque' +
              ' sed ultricies at, egestas quis dolor'}
          </Description>
          <Gap />
          <FilterBox>{'Filter / Sort'}</FilterBox>
          <Gap />
          <WrapQuestboard>{listQuestboards}</WrapQuestboard>
        </Main>
      </Wrap>
    </Layout>
  )
}
