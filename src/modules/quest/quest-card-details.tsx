import { FC } from 'react'

import parseHtml from 'html-react-parser'
import styled from 'styled-components'
import tw from 'twin.macro'

import { QuestColor } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { CommunityType } from '@/types/community'
import { QuestType } from '@/types/quest'
import { CircularImage } from '@/widgets/circular-image'
import { Image } from '@/widgets/image'
import {
  Horizontal,
  HorizontalBetweenCenterFullWidth,
  HorizontalStartCenter,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { MediumText, RewardText } from '@/widgets/text'
import { LockClosedIcon } from '@heroicons/react/24/outline'

const BorderBox = styled.div<{
  isTemplate: boolean
  bgColor: string
}>(({ isTemplate, bgColor }) => {
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

  switch (bgColor) {
    case QuestColor.EMERALD:
      style.push(tw`bg-emerald-50 border-emerald-200`)
      break
    case QuestColor.ORANGE:
      style.push(tw`bg-orange-50 border-orange-200`)
      break
    case QuestColor.INDIGO:
      style.push(tw`bg-indigo-50 border-indigo-200`)
      break
    case QuestColor.PINK:
      style.push(tw`bg-pink-50 border-pink-200`)
      break
    case QuestColor.CYAN:
      style.push(tw`bg-cyan-50 border-cyan-200`)
      break
    default:
      style.push(tw`bg-white border-gray-200`)
      break
  }

  return style
})

const BasicInfoFrame = tw(VerticalFullWidth)`
  h-full
  px-5
  pt-5
`

const TitleQuestBox = tw(MediumText)`
  px-4
  text-black
  max-lg:text-sm
`

const Description = styled.div<{ showCommunity: boolean }>(({ showCommunity }) => {
  const styles = [
    tw`
    w-full
    px-4
    text-gray-700
    font-normal
    text-lg
    max-lg:text-sm
    overflow-hidden
    text-ellipsis
    line-clamp-6
  `,
  ]

  if (showCommunity) {
    styles.push(tw`!line-clamp-4`)
  }

  return styles
})

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

const CommunityDisplayname = tw(MediumText)`
  overflow-auto
  text-ellipsis
  line-clamp-1
`

const GapHorizontal = tw(HorizontalStartCenter)`px-5 pt-5 w-full`

const CommunityFrame: FC<{ community?: CommunityType; showCommunity: boolean }> = ({
  community,
  showCommunity,
}) => {
  if (!showCommunity || !community) {
    return <></>
  }

  return (
    <GapHorizontal>
      <CircularImage height={50} width={50} src={StorageConst.COMMUNITY_DEFAULT.src} />
      <CommunityDisplayname>{community?.display_name}</CommunityDisplayname>
    </GapHorizontal>
  )
}

const LockIcon: FC<{ quest: QuestType }> = ({ quest }) => {
  if (quest.unclaimable_reason === '') {
    return <></>
  }

  return <LockClosedIcon className='w-6 h-6 text-gray mr-2' />
}

const QuestCardDetails: FC<{
  quest: QuestType
  isTemplate?: boolean
  onClick: (e: QuestType) => void
  showCommunity?: boolean
  bgColor?: string
}> = ({
  quest,
  isTemplate = false,
  onClick = () => {},
  showCommunity = false,
  bgColor = QuestColor.EMERALD,
}) => {
  return (
    <BorderBox bgColor={bgColor} isTemplate={isTemplate} onClick={() => onClick(quest)}>
      <CommunityFrame showCommunity={showCommunity} community={quest.community} />
      <BasicInfoFrame>
        <HorizontalBetweenCenterFullWidth>
          <TitleQuestBox>{quest.title}</TitleQuestBox>
          <LockIcon quest={quest} />
        </HorizontalBetweenCenterFullWidth>
        <Gap height={4} />
        <Description showCommunity={showCommunity}>
          {parseHtml(quest.description ?? '')}
        </Description>
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

export default QuestCardDetails
