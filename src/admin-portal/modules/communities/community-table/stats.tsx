import { FC, useEffect, useState } from 'react'

import moment from 'moment'
import { toast } from 'react-hot-toast'
import tw from 'twin.macro'

import { getCommunityStatsApi } from '@/api/communitiy'
import { CommunityStatsType, CommunityType } from '@/types/community'
import BasicModal from '@/widgets/modal/basic'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { MediumTextBase, TextBase, TextSm } from '@/widgets/text'

const Frame = tw(VerticalFullWidth)`
  h-full
  overflow-y-scroll
  p-6
  gap-3
`

const Width32 = tw(HorizontalCenter)`
  w-32
  px-4
  py-2
  rounded-lg
  border
  border-solid
  border-gray-200
  cursor-pointer
`

const GapVertical = tw(VerticalFullWidth)`gap-1`

const StatItem = tw(HorizontalBetweenCenterFullWidth)`
  cursor-pointer
  py-2
  border-b
  border-solid
  border-gray-200
`

const RenderItems: FC<{ stats: CommunityStatsType[] }> = ({ stats }) => {
  const render = stats.map((stat, index) => (
    <StatItem key={index}>
      <TextBase>{stat.date}</TextBase>
      <TextBase>{stat.follower_count}</TextBase>
    </StatItem>
  ))

  return <GapVertical>{render}</GapVertical>
}

export const CommunityStats: FC<{
  comunity: CommunityType | undefined
  isOpen: boolean
  onClose: () => void
}> = ({ comunity, isOpen, onClose }) => {
  const [stats, setStats] = useState<CommunityStatsType[]>([])

  useEffect(() => {
    if (comunity) {
      getStats(comunity.handle)
    }
  }, [comunity])

  const getStats = async (handle: string) => {
    try {
      const end = moment().format('YYYY-MM-DD')
      // Only show the last 14 days
      const begin = moment().add(-14, 'day').format('YYYY-MM-DD')
      const { error, data } = await getCommunityStatsApi({
        handle,
        begin,
        end,
      })
      if (error) {
        toast.error(error)
        return
      }
      if (data) {
        setStats(data.stats)
      }
    } catch (error) {}
  }

  if (!comunity) {
    return <></>
  }

  return (
    <>
      <BasicModal
        styled='!w-[780px] !max-h-[calc(100vh_-_160px)]'
        isOpen={isOpen}
        onClose={onClose}
        title={`${comunity.display_name} stats`}
      >
        <Frame>
          <HorizontalBetweenCenterFullWidth>
            <MediumTextBase>{'Date'}</MediumTextBase>
            <MediumTextBase>{'number of followers'}</MediumTextBase>
          </HorizontalBetweenCenterFullWidth>
          <RenderItems stats={stats} />
        </Frame>
      </BasicModal>
    </>
  )
}

export const PlatformStats: FC = () => {
  const [stats, setStats] = useState<CommunityStatsType[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    getStats()
  }, [])

  const getStats = async () => {
    try {
      const end = moment().format('YYYY-MM-DD')
      // Only show the last 14 days
      const begin = moment().add(-14, 'day').format('YYYY-MM-DD')
      const { error, data } = await getCommunityStatsApi({
        begin,
        end,
      })
      if (error) {
        toast.error(error)
        return
      }
      if (data) {
        setStats(data.stats)
      }
    } catch (error) {}
  }

  if (stats.length === 0) {
    return <></>
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <Width32 onClick={onOpen}>
      <TextSm>{`Today : ${stats[0].follower_count}`}</TextSm>
      <BasicModal
        styled='!w-[780px] !max-h-[calc(100vh_-_160px)]'
        isOpen={isOpen}
        onClose={onClose}
      >
        <Frame>
          <HorizontalBetweenCenterFullWidth>
            <MediumTextBase>{'Date'}</MediumTextBase>
            <MediumTextBase>{'number of followers'}</MediumTextBase>
          </HorizontalBetweenCenterFullWidth>
          <RenderItems stats={stats} />
        </Frame>
      </BasicModal>
    </Width32>
  )
}
