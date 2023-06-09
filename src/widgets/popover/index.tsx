import styled from 'styled-components'
import tw from 'twin.macro'

import { Vertical } from '@/widgets/orientation'
import { Popover } from '@headlessui/react'

export const PopoverPosition = styled(Popover)(tw`
  relative
  z-10
`)

export const PopPanel = styled(Popover.Panel)(tw`
  divide-y
  right-0
  rounded-lg
  mt-5
  absolute z-10
  bg-white
  shadow-lg
  border
  border-solid
  border-gray-300
  w-[350px]
  flex
  flex-col
`)

export const PopItem = tw(Vertical)`
  w-full
  py-2
  px-4
`
