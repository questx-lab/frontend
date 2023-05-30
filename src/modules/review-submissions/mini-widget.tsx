import { ThinBorderBox } from '@/widgets/box'
import { Horizontal, Vertical } from '@/widgets/orientation'
import tw from 'twin.macro'

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
