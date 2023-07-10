import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalCenter } from './orientation'

export const PrimaryText = styled(HorizontalCenter)<{
  size?: string
  isHover?: boolean
}>(({ size = 'md', isHover = false }) => [
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

export const LightText = tw.div`
  text-sm
  text-gray-700
  font-light
  max-sm:text-xl
`

export const NormalText = tw.div`
  text-sm
  text-gray-700
  font-normal
`

export const MediumText = tw.div`
  text-lg
  text-gray-900
  font-medium
  max-sm:text-sm
`

export const Label = tw.div`
  flex
  flex-row
  gap-1
  justify-start
  items-center
  text-xs
  font-bold
  text-gray-900
`

// Used for small description
export const SmallText = tw.div`
  text-sm
  font-normal
  text-gray-700
`

// Text used with blue underline that opens a link
export const UnderlinedText = tw.div`
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
  font-normal
`

export const RequiredText = tw.span`
  text-lg
  font-medium
  text-danger-700
`

export const LabelInput = tw.label`
  text-gray-700
  font-medium
  text-sm
  flex
  flex-row
  gap-2
`

export const HeaderText = tw.h2`
  text-xl
  text-gray-900
  font-medium
  max-md:text-lg
`

////////////////////////////////////////////////

export const HeaderText2 = tw.div`
  text-xl
  font-medium
  text-black
`

export const HeaderText3 = tw.div`
  text-lg
  font-medium
  text-black
`

export const TextXs = tw.div`
  text-xs
  text-gray-900
  font-normal
  max-md:text-lg
`

export const TextSm = tw.div`
  text-sm
  text-gray-900
  font-normal
  max-md:text-lg
`

export const TextBase = tw.div`
  text-lg
  text-gray-900
  font-normal
  max-md:text-lg
`

export const TextXl = tw.div`
  text-xl
  text-gray-900
  font-medium
  max-md:text-lg
`

export const Text2xl = tw.div`
  text-2xl
  text-gray-900
  font-medium
  max-md:text-lg
`

export const Text4xl = tw.div`
  text-4xl
  text-gray-900
  font-medium
  max-md:text-lg
`
