import { FC, useEffect, useState } from 'react'

import moment, { Moment } from 'moment'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { getStreakApi } from '@/api/communitiy'
import { StreakType } from '@/types'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  VerticalFullWidthBetween,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { MediumTextSm } from '@/widgets/text'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'

const Frame = tw(VerticalFullWidthBetween)`
  h-full
  p-6
  text-slate
  gap-3
`

const Header = tw(HorizontalBetweenCenterFullWidth)`
  gap-3
`

const FlexWrap = tw.div`flex flex-wrap justify-between gap-3`

const Gap3Vertical = tw(VerticalFullWidthCenter)`gap-3`

const DateFixedSize = tw(HorizontalCenter)`w-9 h-9`

const ButtonIcon = tw(
  IconButton
)`!w-8 !h-8 text-gray-800 !bg-gray-200 shadow-none! hover:shadow-none! `

const DateBox = styled.div<{ isActiveDate: boolean; isCurrentDate: boolean }>(
  ({ isActiveDate, isCurrentDate }) => {
    const styles = [tw`flex h-8 w-8 items-center justify-center rounded-lg`]

    if (isActiveDate) {
      styles.push(tw`bg-orange text-white`)
    } else {
      if (isCurrentDate) {
        styles.push(tw`bg-gray-200 text-slate`)
      }
    }

    return styles
  }
)

const range = (lo: number, hi: number): number[] => {
  const result = Array<number>(hi - lo)
  for (let i = lo; i < hi; i++) {
    result[i - lo] = i
  }
  return result
}

const getCalendarDays = (now: Moment): (number | null)[][] => {
  const startOfMonth = now.startOf('month')
  const calendarDays: (number | null)[][] = []
  const firstWeekEndDate = 8 - startOfMonth.day()
  const firstWeek = [...range(0, startOfMonth.day()).map(() => null), ...range(1, firstWeekEndDate)]

  calendarDays.push(firstWeek)

  for (
    let weekStartDate = firstWeekEndDate;
    weekStartDate <= now.daysInMonth();
    weekStartDate += 7
  ) {
    calendarDays.push(
      range(weekStartDate, weekStartDate + 7).map((date) =>
        date <= now.daysInMonth() ? date : null
      )
    )
  }
  return calendarDays
}

const hasElementWithStartTime = (array: StreakType[], startTime: string): boolean => {
  return array.some((element) => element.start_time === startTime)
}

const RenderDate: FC = () => {
  return (
    <HorizontalFullWidthCenter className='!gap-2'>
      {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day, i) => {
        return <DateFixedSize key={i}>{day}</DateFixedSize>
      })}
    </HorizontalFullWidthCenter>
  )
}

const Calendar: FC = () => {
  const { communityHandle } = useParams()

  const [now, setNow] = useState(moment())
  const [dayStreaks, setDayStreaks] = useState<StreakType[]>([])

  const formattedNowMonth = now.format('MMMM YYYY')
  const formattedMonthYear = now.format('MM-YYYY')
  const formattedYearMonth = now.format('YYYY-MM')

  const staticNow = moment()
  const calendarDays = getCalendarDays(now)

  useEffect(() => {
    if (communityHandle) {
      getStreak(formattedMonthYear)
    }
  }, [communityHandle])

  const getStreak = async (date: string) => {
    if (communityHandle) {
      try {
        const { error, data } = await getStreakApi(communityHandle, date)
        if (error) {
          toast.error(error)
          return
        }
        if (data) {
          setDayStreaks(data.records)
        }
      } catch (error) {}
    }
  }

  const updateTime = (newNow: Moment) => {
    if (newNow.diff(staticNow, 'day') <= 0) {
      getStreak(newNow.format('MM-YYYY'))
    } else {
      setDayStreaks([])
    }
    setNow(newNow)
  }

  const onPrevMonth = () => {
    const newNow = now.add(-1, 'month')
    updateTime(newNow)
  }

  const onNextMonth = () => {
    const newNow = now.add(1, 'month')
    updateTime(newNow)
  }

  return (
    <Frame>
      <Header>
        <ButtonIcon onClick={onPrevMonth}>
          <ChevronLeftIcon className='w-4 h-4 text-gray-800' />
        </ButtonIcon>
        <MediumTextSm>{formattedNowMonth.toUpperCase()}</MediumTextSm>
        <ButtonIcon onClick={onNextMonth}>
          <ChevronRightIcon className='w-4 h-4 text-gray-800' />
        </ButtonIcon>
      </Header>
      <RenderDate />
      <Gap3Vertical>
        {calendarDays.map((week, i) => {
          return (
            <FlexWrap key={i}>
              {week.map((date, i) => {
                const isActiveDate = hasElementWithStartTime(
                  dayStreaks,
                  formattedYearMonth + `-${date}`
                )
                const isCurrentDate =
                  date === staticNow.date() &&
                  now.month() === staticNow.month() &&
                  now.year() === staticNow.year()
                return (
                  <DateBox isActiveDate={isActiveDate} isCurrentDate={isCurrentDate} key={i}>
                    {date}
                  </DateBox>
                )
              })}
            </FlexWrap>
          )
        })}
      </Gap3Vertical>
    </Frame>
  )
}

export default Calendar
