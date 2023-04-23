import { Divider, Gap } from '@/styles/common.style'
import { CateTitle, HeaderText, QuestWrapCat } from '@/styles/home.style'
import { QTWrap } from '@/styles/leaderboard.style'
import {
  CategoryBox,
  CategoryItem,
  SkeletonFirst,
  SkeletonSecond,
} from '@/styles/myProjects.style'
import {
  ContentQuestBox,
  ImageQuestBox,
  QuestboardBox,
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
      <ImageQuestBox />
      <ContentQuestBox>
        <TitleQuestBox>{'quest card'.toUpperCase()}</TitleQuestBox>
        <SkeletonFirst />
        <SkeletonSecond />
        <SkeletonSecond />
      </ContentQuestBox>
    </QuestboardBox>
  ))

  return (
    <QTWrap>
      <QuestWrapCat>
        <CateTitle>{'View Category'}</CateTitle>
        <Gap height={2} width={0} />
        <CategoryBox>{listCategory}</CategoryBox>
      </QuestWrapCat>
      <Gap height={4} />
      <HeaderText>{'Ready to Claim (Quests that are approved)'}</HeaderText>
      <Divider />
      <WrapQuestboard>{listQuests}</WrapQuestboard>
    </QTWrap>
  )
}
