import { FC } from 'react'

import parseHtml from 'html-react-parser'
import styled from 'styled-components'
import tw from 'twin.macro'

import { QuestColor, QuestRecurrencesStringMap } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { CommunityType } from '@/types/community'
import { QuestType } from '@/types/quest'
import { CircularImage } from '@/widgets/circular-image'
import { Image } from '@/widgets/image'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  HorizontalStartCenter,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { RewardText, TextBase, TextSm } from '@/widgets/text'
import { LockClosedIcon } from '@heroicons/react/24/outline'

const BorderBox = styled.div<{
  isTemplate: boolean
  bgColor: string
  showCommunity: boolean
}>(({ showCommunity, isTemplate, bgColor }) => {
  const style = [
    tw`
    cursor-pointer
    rounded-lg
    border-solid
    border-gray-200
    border-[1px]
    h-[220px]
    w-full
    flex
    flex-col
    hover:shadow-lg
    justify-center
    items-center
    p-5
    gap-3
  `,
  ]

  if (isTemplate) {
    style.push(tw`bg-white border-gray-200`)
  }

  if (showCommunity) {
    style.push(tw`!h-[252px]`)
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
  h-[144px]
  gap-3
`

const TitleQuestBox = tw(TextBase)`
  text-gray-900
  font-medium
  max-lg:text-sm
  overflow-hidden
  text-ellipsis
  line-clamp-2
`

const Description = tw.div`
  w-full
  text-gray-700
  font-normal
  text-lg
  max-lg:text-sm
  overflow-hidden
  text-ellipsis
  line-clamp-2
`

const Footer = tw(HorizontalBetweenCenterFullWidth)`
  w-full
`

const CommunityDisplayname = tw(TextSm)`
  overflow-auto
  text-ellipsis
  line-clamp-1
  font-medium
`

const RecurrenceBox = styled.div<{ bgColor: string }>(({ bgColor }) => {
  const styles = [
    tw`
    px-2
    py-[6px]
    rounded-lg
    text-xs
    font-normal
    text-gray-500
  `,
  ]

  switch (bgColor) {
    case QuestColor.EMERALD:
      styles.push(tw`bg-emerald-100`)
      break
    case QuestColor.ORANGE:
      styles.push(tw`bg-orange-100`)
      break
    case QuestColor.INDIGO:
      styles.push(tw`bg-indigo-100`)
      break
    case QuestColor.PINK:
      styles.push(tw`bg-pink-100`)
      break
    case QuestColor.CYAN:
      styles.push(tw`bg-cyan-100`)
      break
    default:
      styles.push(tw`bg-gray-100`)
  }

  return styles
})

const GapHorizontal = tw(HorizontalStartCenter)`w-full`

const CommunityFrame: FC<{ community?: CommunityType; showCommunity: boolean }> = ({
  community,
  showCommunity,
}) => {
  if (!showCommunity || !community) {
    return <></>
  }

  return (
    <GapHorizontal>
      <CircularImage height={32} width={32} src={StorageConst.COMMUNITY_DEFAULT.src} />
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
    <BorderBox
      showCommunity={showCommunity}
      bgColor={bgColor}
      isTemplate={isTemplate}
      onClick={() => onClick(quest)}
    >
      <CommunityFrame showCommunity={showCommunity} community={quest.community} />
      <BasicInfoFrame>
        <HorizontalBetweenCenterFullWidth>
          <TitleQuestBox>{quest.title}</TitleQuestBox>
          <LockIcon quest={quest} />
        </HorizontalBetweenCenterFullWidth>
        <Description>{parseHtml(quest.description ?? '')}</Description>
      </BasicInfoFrame>
      <Footer>
        <HorizontalCenter>
          <Image width={25} height={25} src={StorageConst.GEM.src} alt={StorageConst.GEM.alt} />
          <RewardText>{quest.points}</RewardText>
        </HorizontalCenter>
        <RecurrenceBox bgColor={bgColor}>
          {QuestRecurrencesStringMap.get(quest.recurrence)?.toUpperCase()}
        </RecurrenceBox>
      </Footer>
    </BorderBox>
  )
}

export default QuestCardDetails
