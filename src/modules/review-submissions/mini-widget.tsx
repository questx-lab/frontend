import styled from 'styled-components'
import tw from 'twin.macro'

import { ReviewBtnEnum } from '@/constants/common.const'
import { RoundedGrayBorderBox } from '@/widgets/box'
import {
  Horizontal,
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  Vertical,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'

/////// Table
export const HeaderFullWidth = tw(Horizontal)`
  w-full
  border-solid
  border-gray-200
  border-b
  h-[60px]
`

export const HeaderTitleFrame = tw(Horizontal)`
  w-full
  h-full
  justify-start
  items-center
  text-lg
  font-medium
  text-gray-900
  px-5
`

export const HeaderSortFrame = tw(HorizontalCenter)`
  w-[117px]
  h-full
  border-l
  border-solid
  border-gray-200
  justify-center
  items-center
  text-sm
  font-medium
  text-gray-900
  px-3
  cursor-pointer
`

export const TableLoadingFrame = tw(VerticalFullWidthCenter)`
  my-8
`

/////// Filter
export const FilterColumn = tw(Vertical)`
  border
  border-solid
  border-gray-200
  w-1/3
  max-md:w-full
  rounded-lg
`

export const FilterTitleFrame = tw(Horizontal)`
  w-full
  text-lg
  font-medium
  text-gray-600
  py-3
  px-4
  h-[60px]
  items-center
`

export const TabContentFrame = tw(Horizontal)`
  w-full
  h-full
  max-md:flex-col-reverse
  gap-4
  pb-6
`

export const InputFrame = tw.div`
  px-4
`

export const SubmissionColumn = tw(RoundedGrayBorderBox)`
  w-2/3
  h-full
  mb-6
  max-md:w-full
  py-0
`

export const ButtonFrame = tw.div`
  py-4
  border-t
  border-solid
  border-gray-200
  fixed
  bottom-0
  w-[calc(100%_-_400px)]
  right-0
  px-36
  max-2xl:px-12
  max-lg:px-6
  bg-white
`

export const ButtonBox = tw(Horizontal)`
  gap-2
  w-[calc(66%_-_2px)]
`

export const VerticalItem = styled(Vertical)<{ active: boolean }>(({ active }) => {
  const styles = [tw`h-full w-full`]
  if (active) {
    styles.push(tw`bg-primary-50`)
  }

  return styles
})

export const Row = tw(HorizontalBetweenCenterFullWidth)`
  w-full
  p-4
  border-t
  border-solid
  border-gray-200
`

export const FullWidth = tw(Horizontal)`
  w-full
`

export const Details = tw(Vertical)`
  w-full
  cursor-pointer
`

export const Title = tw.p`
  mb-2
  font-medium
  text-sm
  text-gray-900
`

export const Info = tw(Horizontal)`
  w-full
  gap-3
  h-full
  items-center
`

export const VerticalLeftMargin = tw(Vertical)`
  items-center
  justify-center
  h-full
`

export const Name = tw.span`
  font-medium
  text-sm
  text-gray-800
  max-w-[300px]
  text-ellipsis
  overflow-hidden
`

export const Time = tw.span`
  font-normal
  text-sm
  text-gray-500
`

export const RowActionButton = styled.button<{ btnType?: number }>(
  ({ btnType = ReviewBtnEnum.ACCEPT }) => {
    const style = [
      tw`
        py-2
        border
        border-solid
        rounded-lg
        text-sm
        font-medium
        w-full
      `,
    ]

    switch (btnType) {
      case ReviewBtnEnum.REJECT:
        style.push(tw`
          border-danger-500
          text-danger-700
          bg-danger-50
          hover:bg-danger-500
          hover:text-white
        `)
        break

      case ReviewBtnEnum.ACCEPT:
        style.push(tw`
          border-success-500
          bg-success-50
          text-success-700
          hover:bg-success-500
          hover:text-white
        `)
        break

      case ReviewBtnEnum.EXPORT:
        style.push(tw`
          py-3
          border-gray-200
          text-black
          hover:bg-gray-300
        `)
        break

      case ReviewBtnEnum.PENDING:
        style.push(tw`
          py-3
          border-warning-300
          bg-warning-50
          text-warning-700
          hover:bg-warning-100
        `)
        break
    }

    return style
  }
)
