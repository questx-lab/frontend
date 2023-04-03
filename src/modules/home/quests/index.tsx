import { SubmitBtn } from '@/styles/button.style'
import { Divider, Gap } from '@/styles/common.style'
import {
  CateTitle,
  HeaderText,
  NotifyBox,
  NotifyText,
  QuestWrap,
  QuestWrapCat,
  SectionBox,
  SectionWrap,
} from '@/styles/home.style'
import { CategoryBox, CategoryItem } from '@/styles/myProjects.style'

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

export default function QuestMod() {
  const listCategory = categories.map((e, i) => (
    <CategoryItem key={i}>{e}</CategoryItem>
  ))

  const listQuests = Array.from(Array(10).keys()).map((e) => (
    <SectionBox key={e}>{`+ Quest Template ${e}`}</SectionBox>
  ))

  return (
    <QuestWrap>
      <Gap height={8} />
      <NotifyBox>
        <NotifyText>{'You have 0 pending submission'}</NotifyText>
        <SubmitBtn>{'review submittions'.toUpperCase()}</SubmitBtn>
      </NotifyBox>
      <Gap height={8} />
      <QuestWrapCat>
        <CateTitle>{'View Category'}</CateTitle>
        <CategoryBox>{listCategory}</CategoryBox>
      </QuestWrapCat>
      <Gap height={8} />
      <HeaderText>{'Section Title'}</HeaderText>
      <Divider />
      <SectionWrap>{listQuests}</SectionWrap>
    </QuestWrap>
  )
}
