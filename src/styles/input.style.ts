import styled from 'styled-components'
import tw from 'twin.macro'

export const InputBox = styled.input<{ danger?: boolean }>(
  ({ danger = false }) => [
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
        border-gray-300
        p-3
        rounded-lg
        focus:border-black
        focus:outline-black
        focus:ring-black
        font-normal
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

export const ErrorBox = tw.div`
  flex
  flex-col
  gap-2
  w-full
  justify-start
  items-start
`

export const ErrorMsg = tw.span`
  text-sm
  font-normal
  text-danger-500
`

export const InputTeleBox = tw.input`
  w-full
  border
  border-[1px]
  border-solid
  border-gray-300
  p-3
  rounded-lg
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
        border-gray-300
        p-3
        rounded-lg
        h-full
        font-normal
      `,
  ]
)

export const LabelInput = tw.label`
  text-black
  font-normal
  text-sm
  flex
  flex-row
  gap-2
`

export const RequireSignal = tw.span`
  text-sm
  font-medium
  text-danger-700
`
