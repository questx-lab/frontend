'use client'

import Image from 'next/image'

import { Layout } from '@/components/layout'
import { StorageConst } from '@/constants/storage.const'
import { FullWidthBtn } from '@/styles/button.style'
import {
  ColSWrap,
  Divider,
  Gap,
  ImgBox,
  LightText,
  MediumTitle,
  NormalText,
  RowBWrap,
  RowSWrap,
  SmallTitle,
  VDevider,
} from '@/styles/common.style'
import {
  ContentProjectBox,
  ProjectBoxWrap,
  TitleProjectBox,
  WrapProjects,
} from '@/styles/explore.style'
import {
  UAvt,
  UBadge,
  UBoxI,
  UInfo,
  UInfoL,
  UInfoR,
  UWrapI,
  Wrap,
} from '@/styles/user.style'
import Settings from '@/modules/settings/settings'

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
      <Wrap className='w-5/6'>
        <Settings userId={params.userId} />
      </Wrap>
    </Layout>
  )
}
