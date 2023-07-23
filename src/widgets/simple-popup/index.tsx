import styled from 'styled-components'
import tw from 'twin.macro'

import { VerticalFullWidth } from '@/widgets/orientation'
import { Listbox } from '@headlessui/react'

export const UpDown = tw.div`
  pointer-events-none
  absolute
  inset-y-0
  right-0
  flex
  items-center
  pr-2
`

export const ListOption = tw(Listbox.Options)`
  absolute
  mt-1
  max-h-60
  w-full
  overflow-auto
  rounded-md
  bg-white
  py-1
  text-lg
  focus:outline-none
  sm:text-sm
  border
  border-solid
  border-gray-200
`

export const CheckIconBox = tw.div`
  absolute
  inset-y-0
  left-0
  flex
  items-center
  pl-3
  text-gray-600
`

export const Padding = tw(VerticalFullWidth)`
  px-8
  py-1
  gap-4
`

export const Relative = tw.div`
  relative mt-1
`

export const ListButton = tw(Listbox.Button)`
  relative
  w-full
  cursor-pointer
  rounded-lg
  bg-white
  py-2
  pl-3
  pr-10
  text-left
  focus:outline-none
  sm:text-sm
  border
  border-solid
  border-gray-200
`
export const ActiveOption = ({ active }: { active: boolean }) =>
  `relative cursor-default select-none py-2 pl-10 pr-4 cursor-pointer ${
    active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
  }`

export const TitleOption = styled.div<{ selected: boolean }>(({ selected }) => {
  const styles = [tw`text-gray-900 block truncate`]
  if (selected) {
    styles.push(tw`font-medium`)
  } else {
    styles.push(tw`font-normal`)
  }

  return styles
})

export const Title = tw.div`
  block
  truncate
  text-lg
  font-normal
  text-gray-900
`
