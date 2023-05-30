import { Gap } from '@/styles/common.style'
import { QuestType } from '@/utils/type'
import { Horizontal, VerticalFullWidth } from '@/widgets/orientation'
import { MediumText, RewardText } from '@/widgets/text'
import { Image } from '@/widgets/image'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import parseHtml from 'html-react-parser'
import { StorageConst } from '@/constants/storage.const'

const BorderBox = styled.div<{
  isTemplate: boolean
}>(({ isTemplate }) => {
  const style = [
    tw`
    cursor-pointer
    rounded-lg
    border-solid
    border-gray-200
    border-[1px]
    h-[300px]
    max-lg:h-[300px]
    w-full
    flex
    flex-col
    hover:shadow-lg
    justify-center
    items-center
  `,
  ]

  if (isTemplate) {
    style.push(tw`bg-white border-gray-200`)
  }

  return style
})

const BasicInfoFrame = tw(VerticalFullWidth)`
  h-full
  py-2
`

const TitleQuestBox = tw(MediumText)`
  px-4
  text-black
  max-lg:text-sm
`

const Description = tw.p`
  px-4
  text-gray-700
  font-normal
  text-lg
  max-lg:text-sm
  overflow-hidden
  text-ellipsis
  line-clamp-3
`

const Body = tw(Horizontal)`
  w-full
  h-16
  justify-between
  items-center
  border-t-[1px]
  border-gray-200
`

const HeaderBox = tw(Horizontal)`
  px-4
  justify-start
  items-center
`

const QuestCard: FunctionComponent<{
  quest: QuestType
  isTemplate: boolean
  onClick?: (e: QuestType) => void
}> = ({ quest, isTemplate, onClick = () => {} }) => {
  return (
    <BorderBox isTemplate={isTemplate} onClick={() => onClick(quest)}>
      <BasicInfoFrame>
        <TitleQuestBox>{quest.title}</TitleQuestBox>
        <Gap height={4} />
        <Description>{parseHtml(quest.description ?? '')}</Description>
      </BasicInfoFrame>

      <Body>
        <HeaderBox>
          <Image width={25} height={25} src={StorageConst.GEM.src} alt={StorageConst.GEM.alt} />
          <Gap width={2} />
          <RewardText>{quest.points}</RewardText>
        </HeaderBox>
      </Body>
    </BorderBox>
  )
}

export default QuestCard
