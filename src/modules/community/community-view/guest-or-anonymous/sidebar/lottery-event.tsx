import { FC, useEffect, useState } from 'react'

import moment from 'moment'
import { useParams } from 'react-router-dom'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import Lottery from '@/modules/lottery/guest'
import CommunityStore from '@/store/local/community'
import { calculateTimeRemaining } from '@/utils/time'
import { VerticalFullWidthCenter } from '@/widgets/orientation'
import { LightTextXs, MediumText2Xl, Text2xl, TextSm, TextXl } from '@/widgets/text'

const Padding = tw.div`p-5 w-full`

const FizedSize = tw.div`
  w-full
  border-2
  border-solid
  border-yellow
  rounded-lg
  pt-12
  px-6
  pb-6
`

const Gap4Vertical = tw(VerticalFullWidthCenter)`
  gap-4
`

const Gap2Horizontal = tw(HorizontalFullWidthCenter)`!gap-2`

const GreenText2xl = tw(Text2xl)`text-green`

const BorderBox = tw(VerticalFullWidthCenter)`
  border
  border-solid
  border-gray-200
  rounded-lg
  py-2
`

const DangerText = tw(TextXl)`text-danger`

type TimeRemainingType = {
  hours: string
  minutes: string
  seconds: string
}

const CountDown: FC = () => {
  const { communityHandle } = useParams()
  const [timeRemaining, setTimeRemaining] = useState<TimeRemainingType>()

  const lotteryEvent = CommunityStore.useStoreState((state) => state.lotteryEvent)
  const setLotteryEvent = CommunityStore.useStoreActions((action) => action.setLotteryEvent)

  useEffect(() => {
    if (lotteryEvent) {
      if (
        // If event is expired or amount of tickets are sold out
        moment(new Date(lotteryEvent.end_time)).isBefore(Date.now()) ||
        lotteryEvent.max_tickets === lotteryEvent.used_tickets
      ) {
        setLotteryEvent(undefined)
        return
      }

      setTimeRemaining(calculateTimeRemaining(new Date(lotteryEvent.end_time)))
      const intervalId = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(new Date(lotteryEvent.end_time)))
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [communityHandle, lotteryEvent])

  if (!lotteryEvent || !timeRemaining) {
    return <></>
  }

  return (
    <Gap2Horizontal>
      <BorderBox>
        <DangerText>{timeRemaining.hours}</DangerText>
        <LightTextXs>{'Hrs'}</LightTextXs>
      </BorderBox>
      <MediumText2Xl>{':'}</MediumText2Xl>
      <BorderBox>
        <DangerText>{timeRemaining.minutes}</DangerText>
        <LightTextXs>{'Mins'}</LightTextXs>
      </BorderBox>
      <MediumText2Xl>{':'}</MediumText2Xl>
      <BorderBox>
        <DangerText>{timeRemaining.seconds}</DangerText>
        <LightTextXs>{'Secs'}</LightTextXs>
      </BorderBox>
    </Gap2Horizontal>
  )
}

const LotteryEvent: FC = () => {
  const lotteryEvent = CommunityStore.useStoreState((state) => state.lotteryEvent)

  if (!lotteryEvent) {
    return <></>
  }

  return (
    <Padding>
      <FizedSize>
        <Gap4Vertical>
          <TextXl>{'Lucky Box'}</TextXl>
          <TextSm>{'The event will end in:'}</TextSm>
          <CountDown />
          <VerticalFullWidthCenter>
            <TextSm>{`Or when the boxes run out.`}</TextSm>
            <TextSm>{`Remaining boxes:`}</TextSm>
          </VerticalFullWidthCenter>
          <GreenText2xl>{lotteryEvent.max_tickets - lotteryEvent.used_tickets}</GreenText2xl>
          <Lottery />
        </Gap4Vertical>
      </FizedSize>
    </Padding>
  )
}

export default LotteryEvent
