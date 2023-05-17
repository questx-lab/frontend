import { Horizontal, Vertical } from '@/widgets/orientation'
import styled, { CSSProperties } from 'styled-components'
import tw from 'twin.macro'

type GapProps = {
  width?: number
  height?: number
}

const widthFormat = (num: number) => {
  switch (num) {
    case 1:
      return tw`w-1`
    case 2:
      return tw`w-2`
    case 3:
      return tw`w-3`
    case 4:
      return tw`w-4`
    case 5:
      return tw`w-5`
    case 6:
      return tw`w-6`
    case 7:
      return tw`w-7`
    case 8:
      return tw`w-8`
    case 9:
      return tw`w-9`
    case 10:
      return tw`w-[40px]`
    case 11:
      return tw`w-[50px]`
    case 12:
      return tw`w-[60px]`
    case 13:
      return tw`w-[70px]`
    default:
      return tw`w-0`
  }
}

const heightFormat = (num: number) => {
  switch (num) {
    case 1:
      return tw`h-1`
    case 2:
      return tw`h-2`
    case 3:
      return tw`h-3`
    case 4:
      return tw`h-4`
    case 5:
      return tw`h-5`
    case 6:
      return tw`h-6`
    case 7:
      return tw`h-7`
    case 8:
      return tw`h-8`
    case 9:
      return tw`h-9`
    case 10:
      return tw`h-[12px]`
    case 11:
      return tw`h-[18px]`
    case 12:
      return tw`h-[24px]`
    case 13:
      return tw`h-[32px]`
    default:
      return tw`h-0`
  }
}

export const Gap = styled.div<GapProps>(({ width = 4, height = 4 }) => [
  () => widthFormat(width),
  () => heightFormat(height),
])

export const Divider = tw.div`
  bg-gray-300
  h-[1px]
  w-full
  my-2
`

export const VDevider = tw.div`
  bg-gray-500
  w-[1.5px]
  h-full
  mx-6
`

export const SpinnerStyle: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#000',
}

export const ColSWrap = tw(Vertical)`
  w-full
`

export const RowSWrap = tw(Horizontal)`
  w-full
  items-center
`

export const RowBWrap = tw(Horizontal)`
  w-full
  justify-between
  items-center
`

export const RowBSWrap = tw(Horizontal)`
  w-full
  justify-between
  max-lg:flex-col
`

export const RowHSWrap = tw(Horizontal)`
  w-1/2
  justify-between
  items-start
  max-lg:flex-col
`
export const RowHEWrap = tw(Horizontal)`
  w-1/2
  justify-between
  items-end
  max-lg:flex-col
`

export const ColCWrap = tw.div`
  w-full
  flex
  flex-col
  justify-center
  items-center
`

export const RowCWrap = tw(Horizontal)`
  w-full
  justify-center
  items-center
`

export const EndWrap = tw.div`
  w-full
  flex
  justify-end
  items-center
`

export const CloseIcon = tw.svg`
  w-6
  h-6
  cursor-pointer
`

export const ImgBox = tw.div`
  w-[200px]
  h-[180px]
  border-2
  border-gray-300
  rounded-lg
  bg-gray-50
`
export const LargeTitle = tw.p`
  text-4xl
  text-black
  font-bold
  max-sm:text-2xl
`

export const MediumTitle = tw.p`
  text-3xl
  text-black
  font-bold
  max-sm:text-2xl
`

export const FullScreen = tw.div`
  w-screen
  h-screen
  flex
  justify-center
  items-center
`
