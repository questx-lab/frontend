import tw from 'twin.macro'

import {
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'

export const Frame = tw(VerticalFullWidthCenter)`
  p-6
  gap-6
`

export const EndHorizontal = tw(HorizontalFullWidth)`justify-end`

export const BorderBox = tw(HorizontalBetweenCenterFullWidth)`
  border
  border-solid
  border-gray-300
  py-[14px]
  px-4
  rounded-lg
  gap-3
`

export const InputForm = tw.input`
  text-sm
  font-normal
  text-gray-900
  outline-0
  ring-0
  w-full
`

export const GapHorizontal = tw(HorizontalBetweenCenterFullWidth)`gap-3`
