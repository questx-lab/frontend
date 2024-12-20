import styled from 'styled-components'
import tw from 'twin.macro'

export const Divider = styled.div<{ thickness?: number }>(({ thickness }) => {
  if (thickness === 2) {
    return tw`
      bg-gray-300
      h-[2px]
      w-full
    `
  }

  return tw`
    bg-gray-300
    h-[1px]
    w-full
  `
})

export const VerticalDivider = styled.div<{ thickness?: number }>(({ thickness }) => {
  if (thickness === 2) {
    return tw`
      bg-gray-300
      w-[2px]
      h-full
    `
  }

  return tw`
    bg-gray-300
    w-[1px]
    h-full
  `
})

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
    case 10:
      return tw`w-[40px]`
    case 11:
      return tw`w-[50px]`
    case 12:
      return tw`w-[60px]`
    case 13:
      return tw`w-[70px]`
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
    case 10:
      return tw`h-[12px]`
    case 11:
      return tw`h-[18px]`
    case 12:
      return tw`h-[24px]`
    case 13:
      return tw`h-[32px]`
    default:
      return tw`h-0`
  }
}

export const Gap = styled.div<GapProps>(({ width = 4, height = 4 }) => [
  () => widthFormat(width),
  () => heightFormat(height),
])
