import { Horizontal, Vertical } from '@/widgets/orientation'
import tw from 'twin.macro'

export const SubmissionAndFilterFrame = tw(Horizontal)`
  gap-4
  w-full
  h-full
  pb-[60px]
`

export const SubmissionFrame = tw.div`
  border
  border-solid
  border-gray-200
  rounded-lg
  w-2/3
  h-full
`

export const SubmissionListFrame = tw(Vertical)`
  w-full
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
