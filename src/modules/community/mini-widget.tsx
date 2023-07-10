import tw from 'twin.macro'

import {
  Horizontal,
  HorizontalBetweenCenter,
  HorizontalBetweenCenterFullWidth,
  Vertical,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'

export const BorderBottom = tw(VerticalFullWidthCenter)`
  w-full
  border-b
  border-solid
  border-gray-200
`

export const FullWidthCenter = tw(HorizontalBetweenCenter)`
  w-full
  max-sm:px-2
  max-sm:w-full
  max-sm:mr-0
  md:px-8
  xl:w-[980px]
  md:w-[780px]
  mr-[280px]
  py-5
`

export const ButtonAlignment = tw(Horizontal)`
  items-center
  justify-end
`

export const FixedWidth = tw(Vertical)`
  max-sm:px-2
  xl:w-[980px]
  xl:px-0
  md:px-8
  md:w-[780px]
  w-full
  gap-10
  mr-[350px]
  2xl:mr-[280px]
  max-md:mr-0
  max-md:w-full
`

export const PaddingHorizontal = tw(HorizontalBetweenCenterFullWidth)`
  max-sm:flex-col
  py-8
  rounded-lg
  gap-6
`
