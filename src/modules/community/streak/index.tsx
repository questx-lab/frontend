import tw from 'twin.macro'

import CalendarFrame from '@/modules/community/streak/calendar'
import { HorizontalCenter, Vertical, VerticalFullWidthCenter } from '@/widgets/orientation'
import { PopPover } from '@/widgets/popover'
import { TextSm, TextXl } from '@/widgets/text'
import { FireIcon } from '@heroicons/react/24/outline'

const Frame = tw(Vertical)`
  w-[344px]
  rounded-lg
  divide-y
  divide-gray-200
`

const IconBtn = tw(HorizontalCenter)`
  gap-2
  cursor-pointer
  bg-primary-50
  rounded-lg
  px-4
  py-2
`

const PaddingVertical = tw(VerticalFullWidthCenter)`
  px-8
  py-6
  gap-2
`

const CenterTextSm = tw(TextSm)`
  text-center
`

const StreakPopover = () => {
  return (
    <PopPover
      button={
        <IconBtn>
          <FireIcon className='h-5 w-5 text-orange' />
          {'2'}
        </IconBtn>
      }
      styled='right-0'
    >
      <Frame>
        <PaddingVertical>
          <TextXl>{'Streak'}</TextXl>
          <CenterTextSm>{`
          X a Quest every day to build your streak. 
          You will lost your streak if you do not complete quests continuously every day.
          `}</CenterTextSm>
        </PaddingVertical>
        <CalendarFrame />
      </Frame>
    </PopPover>
  )
}

export default StreakPopover
