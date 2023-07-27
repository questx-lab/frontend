import { FC, ReactNode } from 'react'

import tw from 'twin.macro'

import { PositiveButton } from '@/widgets/buttons'
import { HorizontalCenter, HorizontalFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { MediumTextSm } from '@/widgets/text'

const EndHorizontal = tw(HorizontalFullWidth)`justify-end`

const GapVertical = tw(VerticalFullWidth)`
  gap-2
`

export const Element: FC<{ label: string; children: ReactNode }> = ({ label, children }) => {
  return (
    <GapVertical>
      <MediumTextSm>{label}</MediumTextSm>
      {children}
    </GapVertical>
  )
}

export const Frame = tw(VerticalFullWidth)`
  h-full
  overflow-y-scroll
  gap-3
`

export const PaddingVertical = tw(VerticalFullWidth)`
  gap-6
  p-6
`

export const FrameContent = tw(VerticalFullWidth)`
  border
  border-solid
  border-gray-200
  rounded-lg
  divide-y
  divide-gray-200
`

export const BorderBox = tw(HorizontalCenter)`
  gap-1
  py-1
  px-2
  text-sm
  border
  border-solid
  border-gray-200
  rounded-lg
  cursor-pointer
  hover:bg-gray-100
`

export const ButtonAdd: FC<{
  onOpenModal: () => void
  buttonName: string
}> = ({ onOpenModal, buttonName }) => {
  return (
    <EndHorizontal onClick={onOpenModal}>
      <PositiveButton>{buttonName}</PositiveButton>
    </EndHorizontal>
  )
}
