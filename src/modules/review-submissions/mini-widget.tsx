import { ReviewBtnEnum } from '@/constants/common.const'
import { ThinBorderBox } from '@/widgets/box'
import { Horizontal, HorizontalBetweenCenterFullWidth, Vertical } from '@/widgets/orientation'
import styled from 'styled-components'
import tw from 'twin.macro'

/////// Header
export const HeaderFullWidth = tw(Horizontal)`
  w-full
  border-solid
  border-gray-200
  border-b
`

export const HeaderTitleFrame = tw(Horizontal)`
  w-full
  justify-start
  items-center
  text-lg
  font-medium
  text-black
  py-3
  px-4
`

export const HeaderSortFrame = tw(Horizontal)`
  w-48
  border-l
  border-solid
  border-gray-200
  justify-center
  items-center
  text-lg
  font-normal
  text-black
  py-3
  cursor-pointer
`

export const SubmissionBorder = tw(ThinBorderBox)`
  w-2/3
  h-full
`

export const ButtonFrame = tw.div`
  py-4
  border-t
  border-solid
  border-gray-200
  fixed
  bottom-0
  w-[calc(100%_-_390px)]
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

export const Row = styled(HorizontalBetweenCenterFullWidth)<{ active?: boolean }>(
  ({ active = false }) => {
    if (active) {
      return tw`
      w-full
      p-4
      border-t
      border-solid
      border-gray-200
      bg-primary-50
    `
    }

    return tw`
    w-full
    p-4
    border-t
    border-solid
    border-gray-200
  `
  }
)

export const FullWidth = tw(Horizontal)`
  items-center
  w-full
`

export const Details = tw(Vertical)`
  w-full
  cursor-pointer
`

export const Title = tw.p`
  mb-2
  font-normal
  text-lg
  text-black
`

export const Info = tw(Horizontal)`
  w-full
`

export const VerticalLeftMargin = tw(Vertical)`
  ml-4
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
