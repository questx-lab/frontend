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
      <Wrap>
        <Gap height={8} />
        <UInfo>
          <UInfoL>
            <UAvt />
            <Gap width={4} />
            <ColSWrap>
              <MediumTitle>{'Username 001'}</MediumTitle>
              <Gap height={3} />
              <RowSWrap>
                <Image
                  width={30}
                  height={30}
                  src={StorageConst.TWITTER_DIR.src}
                  alt={StorageConst.TWITTER_DIR.alt}
                />
                <Gap width={2} />
                <Image
                  width={30}
                  height={30}
                  src={StorageConst.DISCORD_DIR.src}
                  alt={StorageConst.DISCORD_DIR.alt}
                />
                <Gap width={2} />
                <Image
                  width={30}
                  height={30}
                  src={StorageConst.METAMASK_DIR.src}
                  alt={StorageConst.METAMASK_DIR.alt}
                />
              </RowSWrap>
              <Gap height={3} />
              <NormalText>{'Joined on 24 Mar, 2022'}</NormalText>
            </ColSWrap>
          </UInfoL>
          <UInfoR>
            <UBadge>
              <SmallTitle>{'Badges'}</SmallTitle>
              <Gap width={4} />
              <Image
                width={30}
                height={30}
                src={StorageConst.RECOMEND_ICON.src}
                alt={StorageConst.RECOMEND_ICON.alt}
              />
              <Gap width={2} />
              <Image
                width={30}
                height={30}
                src={StorageConst.FAVORITE_ICON.src}
                alt={StorageConst.FAVORITE_ICON.alt}
              />{' '}
            </UBadge>
          </UInfoR>
        </UInfo>
        <UWrapI>
          <UBoxI>
            <Image
              width={30}
              height={30}
              src={StorageConst.DISCORD_DIR.src}
              alt={StorageConst.DISCORD_DIR.alt}
            />
          </UBoxI>
          <Gap width={2} />
          <UBoxI>
            <Image
              width={30}
              height={30}
              src={StorageConst.TWITTER_DIR.src}
              alt={StorageConst.TWITTER_DIR.alt}
            />
          </UBoxI>
          <Gap width={2} />
          <UBoxI>
            <Image
              width={30}
              height={30}
              src={StorageConst.METAMASK_DIR.src}
              alt={StorageConst.METAMASK_DIR.alt}
            />
          </UBoxI>
        </UWrapI>
        <Gap height={9} />
        <MediumTitle>{'NFT Collection'}</MediumTitle>
        <Divider />
        <RowSWrap>
          <ImgBox />
          <Gap />
          <ImgBox />
          <Gap />
          <ImgBox />
          <Gap />
          <ImgBox />
        </RowSWrap>

        <Gap height={9} />
        <MediumTitle>{'Creator for Projects'}</MediumTitle>
        <Divider />
        <WrapProjects>{listProject}</WrapProjects>
      </Wrap>
    </Layout>
  )
}
