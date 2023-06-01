import tw from 'twin.macro'

import { ThinBorderBox } from '@/widgets/box'
import { Horizontal } from '@/widgets/orientation'

export const BorderBox = tw(ThinBorderBox)`
  w-full
  px-6
  py-6
  gap-4
`

export const RewardRow = tw(Horizontal)`
  items-center
`
