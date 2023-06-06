import tw from 'twin.macro'

import { Horizontal, HorizontalBetweenCenter } from '@/widgets/orientation'

export const FullWidthCenter = tw(HorizontalBetweenCenter)`
  w-full
  py-4
`

export const ButtonAlignment = tw(Horizontal)`
  items-center
  justify-end
`
