import styled from 'styled-components'
import tw from 'twin.macro'

import { Vertical } from '@/widgets/orientation'
import { Popover } from '@headlessui/react'

export enum PopoverSize {
  MEDIUM,
  SMALL,
}

export const PopoverPosition = styled(Popover)(tw`
  relative
`)

export const PopPanel = styled(Popover.Panel)<{ size?: PopoverSize }>(({ size }) => {
  switch (size) {
    case PopoverSize.SMALL:
      return tw`
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
        w-[200px]
        flex
        flex-col
      `
  }

  return tw`
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
  `
})

export const PopItem = tw(Vertical)`
  w-full
  py-2
  px-4
`

export const OptionxBox = tw.div`
  w-full
  text-lg
  font-normal
  text-gray-700
  p-2
  px-3
  rounded-lg
  hover:bg-primary-100
`
