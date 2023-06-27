import tw from 'twin.macro'

import { Horizontal, Vertical } from '@/widgets/orientation'

export const BodyFrame = tw.div`
  w-full
  pl-80
  h-full
  mt-[64px]
  divide-y
  divide-gray-200
  max-sm:pl-0
`

export const ButtonBox = tw(Horizontal)`
  w-full
  gap-3
  justify-end
  items-center
  max-md:justify-center
`

export const PaddingVertical = tw(Vertical)`
  py-6
  px-24
  max-md:px-4
  max-md:w-full
`

export const RowBox = tw(Horizontal)`
  gap-6
  max-md:flex-col
`

export const ColumnBox = tw(Vertical)`
  gap-3
`
