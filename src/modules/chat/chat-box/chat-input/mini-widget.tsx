import tw from 'twin.macro'

import { Horizontal } from '@/widgets/orientation'

export const InputBoxBorder = tw.textarea`
  w-full
  py-2
  outline-0
  bg-gray-200
  resize-none
`

export const AdditionBox = tw(Horizontal)`
  gap-2
  w-full
  h-full
  cursor-pointer
  items-center
  p-3
`
