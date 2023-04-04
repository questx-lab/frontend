'use client'

import { FullWidthBtn } from '@/components/buttons/custom-btn.cpn'
import Layout from '@/components/layouts/layout'
import { Gap } from '@/styles/common.style'
import {
  ContentProjectBox,
  Description,
  FilterBox,
  ImageProjectBox,
  LeaderBoardBox,
  ProjectBox,
  SkeletonFirst,
  SkeletonSecond,
  Title,
  TitleProjectBox,
  Wrap,
  WrapProjects,
} from '@/styles/explore.style'

export default function ExplorePage() {
  const listProject = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
    <ProjectBox key={e}>
      <ImageProjectBox />
      <ContentProjectBox>
        <TitleProjectBox>{'project card'.toUpperCase()}</TitleProjectBox>
        <SkeletonFirst />
        <SkeletonSecond />
        <FullWidthBtn text={'button'.toUpperCase()} onClick={() => {}} />
      </ContentProjectBox>
    </ProjectBox>
  ))

  return (
    <Layout>
      <header>
        <title>{'Explore'}</title>
      </header>
      <Wrap>
        <Title>{'Explore (Show all Projects)'}</Title>
        <Gap />
        <Description>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sem eros, scelerisque' +
            ' sed ultricies at, egestas quis dolor'}
        </Description>
        <Gap />
        <LeaderBoardBox>{'Leaderboard (for Projects)'}</LeaderBoardBox>
        <Gap />
        <Gap />
        <FilterBox>{'Filter / Sort'}</FilterBox>
        <Gap />
        <WrapProjects>{listProject}</WrapProjects>
      </Wrap>
    </Layout>
  )
}
