import { ChangeEvent, FC, ReactNode } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { Horizontal } from '@/widgets/orientation'

export enum CheckBoxSize {
  SMALL,
  MEDIUM,
  LARGE,
}

export const CheckBox = styled.input<{ size?: CheckBoxSize }>(({ size = CheckBoxSize.SMALL }) => {
  switch (size) {
    case CheckBoxSize.MEDIUM:
      return tw`
        cursor-pointer
        focus:outline-none
        focus-visible:outline-none
        w-5
        h-5
        text-white
        bg-gray-800
        border-gray-300
        rounded
        mr-4
      `
    case CheckBoxSize.LARGE:
      return tw`
          cursor-pointer
          focus:outline-none
          focus-visible:outline-none
          w-6
          h-6
          text-white
          bg-gray-800
          border-gray-300
          rounded
          mr-4
        `
    default:
      // default is small size
      return tw`
        cursor-pointer
        focus:outline-none
        focus-visible:outline-none
        w-4
        h-4
        text-white
        bg-gray-800
        border-gray-300
        rounded
        mr-4
      `
  }
})

const InputBorder = tw(Horizontal)`
  w-full
  border
  border-solid
  border-gray-200
  border-[1px]
  rounded-lg
  p-2
`

const InputStyle = styled.input<{ full: boolean }>(({ full }) => {
  const style = [
    tw`
      outline-0
      ring-0
    `,
  ]
  if (full) {
    style.push(tw`w-full`)
  }

  return style
})

export const NumberInput: FC<{
  full?: boolean
  leftChild?: ReactNode
  min?: number
  defaultValue: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}> = ({ onChange, full = false, leftChild = <></>, min = -1000000, defaultValue }) => {
  return (
    <InputBorder>
      {leftChild}
      <InputStyle
        full={full}
        onChange={onChange}
        defaultValue={defaultValue}
        min={min}
        type='number'
      />
    </InputBorder>
  )
}

export const TextInput: FC<{
  full?: boolean
  leftChild?: ReactNode
  defaultValue?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}> = ({ onChange, full = false, leftChild = <></>, defaultValue = '' }) => {
  return (
    <InputBorder>
      {leftChild}
      <InputStyle full={full} onChange={onChange} defaultValue={defaultValue} />
    </InputBorder>
  )
}
