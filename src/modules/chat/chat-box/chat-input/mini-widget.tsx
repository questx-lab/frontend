import tw from 'twin.macro'

import { Horizontal, HorizontalCenter } from '@/widgets/orientation'

export const AdditionBox = tw(Horizontal)`
  gap-2
  w-full
  h-full
  cursor-pointer
  items-center
  p-3
`

export const InputEmojiBox = tw(HorizontalCenter)`
  pl-5
  pr-2
  gap-2
  rounded-full
  bg-gray-200
  w-full
  py-2
`
