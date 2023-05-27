import { Horizontal, Vertical } from '@/widgets/orientation'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Row = styled.div<{ active?: boolean }>(({ active = false }) => {
  if (active) {
    return tw`
      flex
      flex-row
      w-full
      justify-between
      items-center
      p-4
      bg-primary-50
      border-t
      border-solid
      border-gray-200
    `
  }

  return tw`
    flex
    flex-row
    w-full
    justify-between
    items-center
    p-4
    border-t
    border-solid
    border-gray-200
  `
})

export const FullWidth = tw(Horizontal)`
  items-center
  w-full
`

export const Details = tw(Vertical)`
  w-full
  cursor-pointer
`

export const Title = tw.p`
  mb-2
  font-normal
  text-lg
  text-black
`

export const Info = tw(Horizontal)`
  w-full
`

export const VerticalLeftMargin = tw(Vertical)`
  ml-4
`

export const Name = tw.span`
  font-medium
  text-sm
  text-gray-800
  max-w-[300px]
  text-ellipsis
  overflow-hidden
`

export const Time = tw.span`
  font-normal
  text-sm
  text-gray-500
`
