import { FC, ReactNode } from 'react'

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

export const PopPanel = styled(Popover.Panel)(() => {
  return tw`
  divide-y
  rounded-lg
  absolute
  z-10
  bg-white
  shadow-lg
  border
  border-solid
  border-gray-300
  flex
  flex-col
  `
})

export const PopItem = tw(Vertical)`
  w-full
  py-6
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
  cursor-pointer
`

export const PopoverButton = tw(Popover.Button)`
  flex
  justify-center
  items-center
  outline-0
`

export const PopPover: FC<{
  button: ReactNode
  children: ReactNode
  styled?: string
  custom?: boolean
}> = ({ button, children, styled, custom = false }) => {
  if (custom) {
    return (
      <PopoverPosition>
        <PopoverButton>{button}</PopoverButton>
        {children}
      </PopoverPosition>
    )
  }

  return (
    <PopoverPosition>
      <PopoverButton>{button}</PopoverButton>
      <PopPanel className={styled}>{children}</PopPanel>
    </PopoverPosition>
  )
}
