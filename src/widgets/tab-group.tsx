import { Horizontal } from '@/widgets/orientation'
import styled from 'styled-components'
import tw from 'twin.macro'

// This is the tab used in the "Review Submission" or Settings of a community
export const Tab = tw(Horizontal)`
  w-full
  bg-gray-100
  border-y
  border-solid
  border-gray-200
  px-36
  max-2xl:px-12
  max-lg:px-6
  justify-center
  items-center
`

export const TabItem = styled.div<{ active?: boolean }>(({ active = false }) => {
  if (active) {
    return tw`
      w-1/2
      bg-white
      flex
      flex-row
      justify-center
      items-center
      text-sm
      font-medium
      text-primary
      py-4
      border-x
      border-solid
      border-gray-200
      cursor-pointer
    `
  }

  return tw`
    w-1/2
    bg-gray-100
    flex
    flex-row
    justify-center
    items-center
    text-sm
    font-medium
    text-black
    py-4
    border-x
    border-solid
    border-gray-200
    cursor-pointer
  `
})
