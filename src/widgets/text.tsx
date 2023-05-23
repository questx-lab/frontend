import styled from 'styled-components'
import tw from 'twin.macro'

export const PrimaryText = styled.span<{ size?: string; isHover?: boolean }>(
  ({ size = 'sm', isHover = false }) => [
    tw`
    text-primary
    font-normal
    flex
    flex-row
    gap-2
  `,
    size === 'xs' && tw`text-xs`,
    size === 'sm' && tw`text-sm`,
    size === 'lg' && tw`text-lg`,
    size === 'xl' && tw`text-xl`,
    isHover && tw`cursor-pointer`,
  ]
)

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
  max-sm:text-xs
  text-start
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
  max-sm:text-lg
  3xl:text-4xl
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
