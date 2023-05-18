import styled from 'styled-components'
import tw from 'twin.macro'

import { VerticalFullWidth } from '@/widgets/orientation'

export const InputBox = styled.input<{ danger?: boolean; block?: boolean }>(
  ({ danger = false, block = false }) => [
    danger
      ? tw`
        w-full
        border
        border-[1px]
        border-solid
        border-danger-700
        p-3
        rounded-lg
        focus:border-danger-500
        focus:outline-danger-500
        focus:outline
        focus:ring-danger-500
      `
      : tw`
        w-full
        border
        border-[1px]
        border-solid
        border-primary
        p-3
        rounded-lg
        focus:border-primary
        focus:outline-primary
        focus:ring-primary
        font-normal
      `,
    block &&
      tw`
        border-gray-300
        bg-gray-100
      `,
  ]
)

export const InputInviteBox = tw.input`
  w-full
  border
  border-[1px]
  border-solid
  border-gray-300
  p-3
  rounded-lg
`

export const ErrorBox = tw(VerticalFullWidth)`
  gap-2
`

export const ErrorMsg = tw.span`
  text-sm
  font-normal
  text-danger-500
`

export const InputBBox = tw.input`
  w-full
  border-0
  p-3
  rounded-lg
`

export const MulInputBox = styled.textarea<{ danger?: boolean }>(
  ({ danger = false }) => [
    danger
      ? tw`
        w-full
        border
        border-[1px]
        border-solid
        border-danger-500
        p-3
        rounded-lg
        h-full
        focus:border-danger-500
        focus:outline-danger-500
        focus:outline
        focus:ring-danger-500
      `
      : tw`
        w-full
        border
        border-[1px]
        border-solid
        border-primary-300
        p-3
        rounded-lg
        h-full
        font-normal
        focus:border-primary
        focus:outline-primary
        focus:ring-primary
      `,
  ]
)

export const LabelInput = tw.label`
  text-gray-700
  font-medium
  text-sm
  flex
  flex-row
  gap-2
`

export const RequireSignal = tw.span`
  text-lg
  font-medium
  text-danger-700
`
