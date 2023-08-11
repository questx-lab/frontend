import { FC, useEffect, useState } from 'react'

import moment from 'moment'
import { toast } from 'react-hot-toast'
import tw from 'twin.macro'

import { getCommunityStatsApi } from '@/api/communitiy'
import { CommunityStatsType, CommunityType } from '@/types/community'
import BasicModal from '@/widgets/modal/basic'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { OptionxBox } from '@/widgets/popover'
import { MediumTextBase, TextBase } from '@/widgets/text'

const Frame = tw(VerticalFullWidth)`
  h-full
  overflow-y-scroll
  p-6
  gap-3
`

const GapVertical = tw(VerticalFullWidth)`gap-1`

const StatItem = tw(HorizontalBetweenCenterFullWidth)`
  cursor-pointer
  py-2
  border-b
  border-solid
  border-gray-200
`

const CommunityStats: FC<{ comunity: CommunityType }> = ({ comunity }) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [stats, setStats] = useState<CommunityStatsType[]>([])

  useEffect(() => {
    console.log('vao day')
    getStats(comunity.handle)
  }, [])

  const getStats = async (handle: string) => {
    try {
      const end = moment().format('YYYY-MM-DD')
      // Only show the last 14 days
      const start = moment().add(-14, 'day').format('YYYY-MM-DD')
      const { error, data } = await getCommunityStatsApi(handle, start, end)
      if (error) {
        toast.error(error)
        return
      }
      if (data) {
        setStats(data.stats)
      }
    } catch (error) {}
  }

  const RenderItems: FC = () => {
    const render = stats.map((stat, index) => (
      <StatItem key={index}>
        <TextBase>{stat.date}</TextBase>
        <TextBase>{stat.followers}</TextBase>
      </StatItem>
    ))

    return <GapVertical>{render}</GapVertical>
  }

  return (
    <>
      <OptionxBox className='!py-1' onClick={() => setOpen(true)}>
        {'Statics'}
      </OptionxBox>
      <BasicModal
        styled='!w-[780px] !max-h-[calc(100vh_-_160px)]'
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        title={`${comunity.display_name} stats`}
      >
        <Frame>
          <HorizontalBetweenCenterFullWidth>
            <MediumTextBase>{'Date'}</MediumTextBase>
            <MediumTextBase>{'number of followers'}</MediumTextBase>
          </HorizontalBetweenCenterFullWidth>
          <RenderItems />
        </Frame>
      </BasicModal>
    </>
  )
}

export default CommunityStats
