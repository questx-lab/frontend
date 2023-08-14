import { FC } from 'react'

import parseHtml from 'html-react-parser'
import styled from 'styled-components'
import tw from 'twin.macro'

import { QuestColor, QuestRecurrencesStringMap } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import { CommunityType } from '@/types/community'
import { QuestType } from '@/types/quest'
import { calculateDayRemaining } from '@/utils/time'
import { CircularImage } from '@/widgets/circular-image'
import { Image } from '@/widgets/image'
import {
  HorizontalBetween,
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  HorizontalStartCenter,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { RewardText, TextBase, TextSm, TextXs } from '@/widgets/text'
import { LockClosedIcon } from '@heroicons/react/24/outline'

const BorderBox = styled.div<{
  isTemplate: boolean
  bgColor: string
  showCommunity: boolean
  isBlock?: boolean
}>(({ showCommunity, isTemplate, bgColor, isBlock = false }) => {
  const style = [
    tw`
    cursor-pointer
    rounded-lg
    border-solid
    border-gray-200
    border-[2px]
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

  if (isBlock) {
    style.push(tw`bg-gray-50`)
  } else {
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

const Footer = tw(Vertical)`
  w-full
  gap-1
`

const RemainingTime = tw(TextXs)`text-success`

const Title = tw(HorizontalBetween)`w-full`

const CommunityDisplayname = tw(TextSm)`
  overflow-auto
  text-ellipsis
  line-clamp-1
  font-medium
`

const RecurrenceBox = styled.div<{ bgColor: string; isBlock?: boolean }>(
  ({ bgColor, isBlock = false }) => {
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

    if (isBlock) {
      styles.push(tw`bg-gray-100`)
    } else {
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
    }

    return styles
  }
)

const FixedIconSize = tw.div`w-4 h-4`

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
      <CircularImage
        height={32}
        width={32}
        src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
      />
      <CommunityDisplayname>{community?.display_name}</CommunityDisplayname>
    </GapHorizontal>
  )
}

const LockIcon: FC<{ quest: QuestType }> = ({ quest }) => {
  if (quest.unclaimable_reason === '') {
    return <></>
  }

  return (
    <FixedIconSize>
      <LockClosedIcon className='w-4 h-4 text-gray mr-2' />
    </FixedIconSize>
  )
}

const RemainingTiming: FC<{ time: string | undefined }> = ({ time }) => {
  if (!time) {
    return <></>
  }

  const date = calculateDayRemaining(new Date(time))

  const day = parseInt(date.days, 10) === 0 ? '' : `${date.days}days:`
  const hour = parseInt(date.hours, 10) === 0 ? '' : `${date.hours}hrs:`
  const min = parseInt(date.minutes, 10) === 0 ? '' : `${date.minutes}mins`

  return <RemainingTime>{`on in ${day}${hour}${min}`}</RemainingTime>
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
      isBlock={quest.unclaimable_reason !== ''}
    >
      <CommunityFrame showCommunity={showCommunity} community={quest.community} />
      <BasicInfoFrame>
        <Title>
          <TitleQuestBox>{quest.title}</TitleQuestBox>
          <LockIcon quest={quest} />
        </Title>
        <Description>{parseHtml(quest.description ?? '')}</Description>
      </BasicInfoFrame>
      <Footer>
        <RemainingTiming time={quest.unclaimable_reason_metadata?.next_claim} />
        <HorizontalBetweenCenterFullWidth>
          <HorizontalCenter>
            <Image width={25} height={25} src={StorageConst.GEM.src} alt={StorageConst.GEM.alt} />
            <RewardText>{quest.points}</RewardText>
          </HorizontalCenter>
          <RecurrenceBox bgColor={bgColor} isBlock={quest.unclaimable_reason !== ''}>
            {QuestRecurrencesStringMap.get(quest.recurrence)?.toUpperCase()}
          </RecurrenceBox>
        </HorizontalBetweenCenterFullWidth>
      </Footer>
    </BorderBox>
  )
}

export default QuestCardDetails
