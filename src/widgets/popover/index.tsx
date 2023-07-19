import { FC, ReactNode } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { Vertical } from '@/widgets/orientation'
import { Popover, Transition } from '@headlessui/react'

export enum PopoverSize {
  MEDIUM,
  SMALL,
}

export const PopoverPosition = styled(Popover)<{ isFull: boolean }>(({ isFull }) => {
  const styles = [
    tw`
  relative
`,
  ]

  if (isFull) {
    styles.push(tw`w-full`)
  }

  return styles
})

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

export const PopoverButton = styled(Popover.Button)<{ isFull: boolean }>(({ isFull }) => {
  const styles = [
    tw`
  flex
  justify-center
  items-center
  outline-0
`,
  ]

  if (isFull) {
    styles.push(tw`w-full`)
  }

  return styles
})

export const PopPover: FC<{
  button: ReactNode
  children: ReactNode
  styled?: string
  visible?: boolean
  isFull?: boolean
}> = ({ button, children, styled, visible, isFull = false }) => {
  return (
    <PopoverPosition isFull={isFull}>
      <PopoverButton isFull={isFull}>{button}</PopoverButton>
      <Transition
        show={visible}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <PopPanel className={styled}>{children}</PopPanel>
      </Transition>
    </PopoverPosition>
  )
}
