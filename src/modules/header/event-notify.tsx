import { FC, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import moment from 'moment'
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
  const [loading, setLoading] = useState<boolean>(true)
  const [timeRemaining, setTimeRemaining] = useState<TimeRemainingType>()
  const [loteryEvent, setLotteryEvent] = useState<LotteryEventType>()

  const hasEvent = useStoreState<GlobalStoreModel>((state) => state.hasEvent)

  const setHasEvent = useStoreActions<GlobalStoreModel>((action) => action.setHasEvent)

  useEffect(() => {
    setLoading(true)
    if (communityHandle) {
      getLotteryEvent()
    }
  }, [communityHandle])

  const getLotteryEvent = async () => {
    try {
      const { data, error } = await getLotteryEventApi(communityHandle || '')
      if (error) {
        setHasEvent(false)
        return
      }

      if (data) {
        if (
          // If event is expired or amount of tickets are sold out
          moment(new Date(data.event.end_time)).isBefore(Date.now()) ||
          data.event.max_tickets === data.event.used_tickets
        ) {
          setHasEvent(false)
          setLotteryEvent(undefined)
          return
        }

        setLotteryEvent(data.event)
        setHasEvent(true)
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        // Becase setinterval will delay 1s, so when we change community,
        //time have not updated as soon as possible, so we can delay 1s to fetch new time
        setLoading(false)
      }, 1000)
    }
  }

  useEffect(() => {
    if (loteryEvent) {
      if (
        // If event is expired or amount of tickets are sold out
        moment(new Date(loteryEvent.end_time)).isBefore(Date.now()) ||
        loteryEvent.max_tickets === loteryEvent.used_tickets
      ) {
        return
      }
      const intervalId = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(new Date(loteryEvent.end_time)))
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [loteryEvent, communityHandle])

  if (!hasEvent) {
    return <></>
  }

  if (loading || !timeRemaining) {
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
