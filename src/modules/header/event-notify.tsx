import { FC, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { getLotteryEventApi } from '@/api/loterry'
import { GlobalStoreModel } from '@/store/store'
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

const EventNotify: FC = () => {
  const { communityHandle } = useParams()
  const [loading, setLoading] = useState<boolean>(true)

  const lotteryEvent = useStoreState<GlobalStoreModel>((state) => state.lotteryEvent)

  const setLotteryEvent = useStoreActions<GlobalStoreModel>((action) => action.setLotteryEvent)

  useEffect(() => {
    setLoading(true)
    getLotteryEvent()
  }, [communityHandle])

  const getLotteryEvent = async () => {
    try {
      const { data, error } = await getLotteryEventApi(communityHandle || '')
      if (error) {
        setLotteryEvent(undefined)
        return
      }

      if (data) {
        if (
          // If event is expired or amount of tickets are sold out
          moment(new Date(data.event.end_time)).isBefore(Date.now()) ||
          data.event.max_tickets === data.event.used_tickets
        ) {
          setLotteryEvent(undefined)
          return
        }

        setLotteryEvent(data.event)
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

  if (!lotteryEvent) {
    return <></>
  }

  if (loading) {
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
            {'Use your points in XQuest to join our lottery to earn free USDT. Hurry up!'}
          </WhiteTextSm>
        </HorizontalFullWidthCenter>
        <PaddingIcon onClick={() => setLotteryEvent(undefined)}>
          <XMarkIcon className='w-5 h-5 text-gray-50' />
        </PaddingIcon>
      </HorizontalBetweenCenterFullWidth>
    </FrameEvent>
  )
}

export default EventNotify
