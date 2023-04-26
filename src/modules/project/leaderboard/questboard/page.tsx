import Image from 'next/image'

import { StorageConst } from '@/constants/storage.const'
import { Divider, Gap } from '@/styles/common.style'
import { HeaderText } from '@/styles/home.style'
import { QTWrap } from '@/styles/leaderboard.style'
import { CategoryItem } from '@/styles/myProjects.style'
import {
  Boarding,
  BoardingCard,
  Card,
  CardBox,
  DesQ,
  EndBoarding,
  HeaderBox,
  PointText,
  QuestboardBox,
  StartBoarding,
  TitleQuestBox,
  WrapQuestboard,
} from '@/styles/questboard.style'

const categories = [
  'NFT',
  'GameFi',
  'DeFi',
  'DAO',
  'SocialFi',
  'Metaverse',
  'Tools',
  'Ecosystem',
  'Others',
]

export default function QuestBoardTab() {
  const listCategory = categories.map((e, i) => (
    <CategoryItem key={i}>{e}</CategoryItem>
  ))

  const listQuests = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
    <QuestboardBox key={e}>
      <StartBoarding>
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
          <Card type={1}>{'ONCE'}</Card>
          <Gap width={2} />
        </CardBox>
      </EndBoarding>
    </QuestboardBox>
  ))

  const listBoarding = [0, 1, 2, 3].map((e) => (
    <BoardingCard key={e}>
      <StartBoarding>
        <TitleQuestBox>{'Join Discord 👾'}</TitleQuestBox>
        <Gap height={4} />
        <DesQ>
          {'Get a Discord Role and introduce yourself to the community.'}
        </DesQ>
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
          <Card>{'DAILY'}</Card>
          <Gap width={2} />
        </CardBox>
      </EndBoarding>
    </BoardingCard>
  ))

  return (
    <QTWrap>
      {/* <QuestWrapCat>
        <CateTitle>{'View Category'}</CateTitle>
        <Gap height={2} width={0} />
        <CategoryBox>{listCategory}</CategoryBox>
      </QuestWrapCat> */}
      <HeaderText>{'👋 Popular Quests'}</HeaderText>
      <Gap height={6} />
      <Boarding>{listBoarding}</Boarding>
      <Gap height={4} />
      <Divider />
      <HeaderText>{'🔥 Quests'}</HeaderText>
      <Gap height={6} />
      {/* <Divider /> */}
      <WrapQuestboard>{listQuests}</WrapQuestboard>
    </QTWrap>
  )
}
