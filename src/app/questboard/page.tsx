'use client'

import Layout from '@/components/layouts/layout'
import SidebarCustom from '@/components/layouts/sidebar'
import { Gap } from '@/styles/common.style'
import {
  ContentQuestBox,
  Description,
  FilterBox,
  ImageQuestBox,
  Main,
  QuestboardBox,
  SkeletonFirst,
  SkeletonSecond,
  Title,
  TitleQuestBox,
  Wrap,
  WrapQuestboard,
} from '@/styles/questboard.style'

export default function Questboard() {
  const listQuestboards = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
    <QuestboardBox key={e}>
      <ImageQuestBox />
      <ContentQuestBox>
        <TitleQuestBox>{'quest card'.toUpperCase()}</TitleQuestBox>
        <SkeletonFirst />
        <SkeletonSecond />
      </ContentQuestBox>
    </QuestboardBox>
  ))

  return (
    <Layout>
      <header>
        <title>{'Questboard'}</title>
      </header>
      <Wrap>
        <SidebarCustom />
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
