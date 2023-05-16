import tw from 'twin.macro'
import styled from 'styled-components'

export const NegativeButton = tw.button`
  bg-white
  hover:bg-gray-100
  text-sm
  text-black
  font-medium
  py-3
  px-6
  rounded-lg
  max-lg:hidden
  border
  border-gray-300
  border-solid
`

export const PositiveButton = styled.button<{ disabled?: boolean }>(
  ({ disabled: block = false }) => [
    !block &&
      tw`
      bg-primary
      hover:bg-primary-300
      text-sm
      text-white
      font-medium
      py-3
      px-6
      rounded-lg
      max-lg:hidden
    `,
    block &&
      tw`
      bg-primary-300
      text-sm
      text-white
      font-medium
      py-3
      px-6
      rounded-lg
      max-lg:hidden
    `,
  ]
)
