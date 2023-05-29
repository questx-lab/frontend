import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalCenter } from './orientation'

export const PrimaryText = styled(HorizontalCenter)<{
  size?: string
  isHover?: boolean
}>(({ size = 'sm', isHover = false }) => [
  tw`
    text-primary
    font-normal
    gap-2
    max-md:text-sm
  `,
  size === 'xs' && tw`text-xs`,
  size === 'sm' && tw`text-sm`,
  size === 'lg' && tw`text-lg`,
  size === 'xl' && tw`text-xl`,
  isHover && tw`cursor-pointer`,
])

export const LightText = tw.p`
  text-sm
  text-gray-700
  font-light
  max-sm:text-xl
`

export const NormalText = tw.p`
  text-lg
  text-gray-700
  font-normal
`

export const MediumText = tw.p`
  text-lg
  text-gray-900
  font-medium
  max-sm:text-sm
`

export const LargeText = tw.p`
  text-xl
  text-black
  font-bold
  max-md:text-xl
`

export const Label = tw.div`
  flex
  flex-row
  gap-1
  justify-start
  items-center
  text-lg
  font-medium
  text-gray-900
`

export const Large3xlText = tw.p`
  text-3xl
  text-black
  font-bold
  max-sm:text-2xl
`

// Used for small description
export const SmallText = tw.p`
  text-sm
  font-normal
  text-gray-700
`

// Text used with blue underline that opens a link
export const UnderlinedText = tw.p`
  text-primary-500
  underline
  underline-offset-4
  text-sm
  font-normal
  cursor-pointer
`

// Used to display the point rewards
export const RewardText = tw.span`
  text-[#FF7B05]
  text-lg
  font-medium
`
