import tw from 'twin.macro'

import { RoundedGrayBorderBox } from '@/widgets/box'
import { Horizontal } from '@/widgets/orientation'

export const BorderBox = tw(RoundedGrayBorderBox)`
  w-full
  p-5
  gap-3
  flex
  flex-col
  justify-start
  items-start
`

export const RewardRow = tw(Horizontal)`
  items-center
`
