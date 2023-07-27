import { FC, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { getLotteryEventApi } from '@/api/loterry'
import { GlobalStoreModel } from '@/store/store'
import { LotteryEventType } from '@/types/lottery'
import { calculateTimeRemaining } from '@/utils/time'
import { PaddingIcon } from '@/widgets/box'
import { HorizontalBetweenCenterFullWidth, HorizontalCenter } from '@/widgets/orientation'
import { SmallSpinner } from '@/widgets/spinner'
import { TextSm } from '@/widgets/text'
import { XMarkIcon } from '@heroicons/react/24/outline'

const FixedWidth = styled.div<{ hasEvent?: boolean }>(({ hasEvent }) => {
  const styles = [tw`w-full !h-[64px] bg-white fixed flex flex-col justify-end`]

  if (hasEvent) {
    styles.push(tw`!h-[112px]`)
  }

  return styles
})

const WhiteTextSm = tw(TextSm)`!text-white`

const FrameEvent = tw(HorizontalFullWidthCenter)`h-[48px] w-full bg-primary px-6`

type TimeRemainingType = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

const EventNotify: FC = () => {
  const { communityHandle } = useParams()
  const [timeRemaining, setTimeRemaining] = useState<TimeRemainingType>()
  const [loteryEvent, setLotteryEvent] = useState<LotteryEventType>()

  const hasEvent = useStoreState<GlobalStoreModel>((state) => state.hasEvent)

  const setHasEvent = useStoreActions<GlobalStoreModel>((action) => action.setHasEvent)

  useEffect(() => {
    getLotteryEvent()
  }, [])

  const getLotteryEvent = async () => {
    try {
      const { data, error } = await getLotteryEventApi(communityHandle || '')
      if (error) {
        setHasEvent(false)
        return
      }

      if (data) {
        setLotteryEvent(data.event)
        setHasEvent(true)
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (loteryEvent) {
      const intervalId = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(new Date(loteryEvent.end_time)))
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [loteryEvent])

  if (!hasEvent) {
    return <></>
  }

  if (!timeRemaining) {
    return (
      <HorizontalCenter>
        <SmallSpinner />
      </HorizontalCenter>
    )
  }

  return (
    <FrameEvent>
      <HorizontalBetweenCenterFullWidth>
        <HorizontalFullWidthCenter>
          <WhiteTextSm>
            {'Use your points in XQuest to join our lottery to earn free USDT. Hurry up, remaining time to join: ' +
              `${timeRemaining.days} days, ${timeRemaining.hours} : ${timeRemaining.minutes} : ${timeRemaining.seconds}s`}
          </WhiteTextSm>
        </HorizontalFullWidthCenter>
        <PaddingIcon onClick={() => setHasEvent(false)}>
          <XMarkIcon className='w-5 h-5 text-gray-50' />
        </PaddingIcon>
      </HorizontalBetweenCenterFullWidth>
    </FrameEvent>
  )
}

export default EventNotify
