'use client'

import tw from 'twin.macro'

import { Layout } from '@/components/layout'
import Settings from '@/modules/settings/settings'
import { FullWidthBtn } from '@/styles/button.style'
import {
  Gap,
  LightText,
  RowBWrap,
  SmallTitle,
  VDevider,
} from '@/styles/common.style'
import { Wrap } from '@/styles/user.style'

const ContentProjectBox = tw.div`
  flex
  flex-col
  justify-between
`

const ProjectBoxWrap = tw.div`
  cursor-pointer
  p-5
  border
  rounded-lg
  border
  border-solid
  border-gray-300
  flex
  flex-col
  justify-between
  mt-[16px]
  max-sm:w-full
  max-xl:mt-[16px]
  h-[350px]
  hover:shadow-lg
`

const TitleProjectBox = tw.p`
  mt-3
  text-black
  font-medium
  text-lg
  max-lg:text-lg
`

const WrapProjects = tw.div`
  grid
  grid-cols-4
  gap-4
  max-2xl:grid-cols-3
  max-xl:grid-cols-2
  max-sm:grid-cols-1
`

export default function UserProfile({
  params,
}: {
  params: { userId: string }
}) {
  const listProject = [1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
    <ProjectBoxWrap key={e}>
      <ContentProjectBox>
        <TitleProjectBox>{e}</TitleProjectBox>
        <Gap height={3} />
        <LightText>{'Intro-2 Lines'}</LightText>
        <LightText>
          {'Lorem ipsum dolor sit amet, consectetur adipisc'}
        </LightText>
        <Gap height={5} />
        <RowBWrap>
          <SmallTitle>{'46 Quests'}</SmallTitle>
          <VDevider />
          <SmallTitle>{'6.54K Followers'}</SmallTitle>
        </RowBWrap>
        <Gap height={5} />
        <FullWidthBtn onClick={() => {}}>{'DETAIL'}</FullWidthBtn>
      </ContentProjectBox>
    </ProjectBoxWrap>
  ))

  return (
    <Layout>
      <header>
        <title>{'Profile'}</title>
      </header>
      <Wrap className='w-full'>
        <Settings userId={params.userId} />
      </Wrap>
    </Layout>
  )
}
