import styled from 'styled-components'
import tw from 'twin.macro'

type GapProps = {
  width?: number
  height?: number
}

const widthFormat = (num: number) => {
  switch (num) {
    case 1:
      return tw`w-1`
    case 2:
      return tw`w-2`
    case 3:
      return tw`w-3`
    case 4:
      return tw`w-4`
    case 5:
      return tw`w-5`
    case 6:
      return tw`w-6`
    case 7:
      return tw`w-7`
    case 8:
      return tw`w-8`
    case 9:
      return tw`w-9`
    default:
      return tw`w-0`
  }
}

const heightFormat = (num: number) => {
  switch (num) {
    case 1:
      return tw`h-1`
    case 2:
      return tw`h-2`
    case 3:
      return tw`h-3`
    case 4:
      return tw`h-4`
    case 5:
      return tw`h-5`
    case 6:
      return tw`h-6`
    case 7:
      return tw`h-7`
    case 8:
      return tw`h-8`
    case 9:
      return tw`h-9`
    default:
      return tw`h-0`
  }
}

export const Gap = styled.div<GapProps>(({ width = 4, height = 4 }) => [
  () => widthFormat(width),
  () => heightFormat(height),
])

export const Divider = tw.div`
  bg-gray-300
  h-[1.5px]
`
