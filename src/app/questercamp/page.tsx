'use client'

import Image from 'next/image'

import { Layout } from '@/components/layout'
import ProjectSide from '@/components/sidebar'
import { StorageConst } from '@/constants/storage.const'
import { Gap } from '@/styles/common.style'
import {
  Card,
  CardBox,
  Description,
  DesQ,
  EndBoarding,
  FilterBox,
  HeaderBox,
  ImageQuestBox,
  Main,
  PointText,
  QuestboardBox,
  StartBoarding,
  Title,
  TitleQuestBox,
  Wrap,
  WrapQuestboard,
} from '@/styles/questboard.style'

export default function Questboard() {
  const listQuestboards = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
    <QuestboardBox key={e}>
      <StartBoarding>
        <HeaderBox>
          <ImageQuestBox
            width={50}
            height={50}
            src={StorageConst.MANTA_LOGO.src}
            alt={StorageConst.MANTA_LOGO.alt}
          />
          <TitleQuestBox>{'Manta Network'}</TitleQuestBox>
        </HeaderBox>
        <Gap height={4} />
        <TitleQuestBox>
          {"🎉 deFarm's $1,000 USDC Airdrop - Join the Farm Now!"}
        </TitleQuestBox>
        <Gap height={4} />
        <DesQ>{'Please visit Manta Network official website'}</DesQ>
      </StartBoarding>
      <EndBoarding>
        <HeaderBox>
          <Image
            width={25}
            height={25}
            src={StorageConst.POINT_ICON.src}
            alt={StorageConst.POINT_ICON.alt}
          />
          <Gap width={2} />
          <PointText>{'300 Gems'}</PointText>
        </HeaderBox>
        <CardBox>
          <Card type={1}>{'DAILY'}</Card>
          <Gap width={2} />
        </CardBox>
      </EndBoarding>
    </QuestboardBox>
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
