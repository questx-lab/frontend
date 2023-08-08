import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { VerticalFullWidth } from './orientation'

const ErrorBox = tw(VerticalFullWidth)`
  gap-2
`

const MultipleInputBox = styled.textarea<{ danger?: boolean }>(({ danger = false }) => [
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
])

export const InputBox = styled.input<{
  danger?: boolean
  block?: boolean
  isValid?: boolean
}>(({ danger = false, block = false, isValid }) => {
  const styles = [
    tw`
          w-full
          border
          border-[1px]
          border-solid
          ring-0
          outline-none
          border-primary
          p-3
          rounded-lg
    `,
  ]
  if (danger) {
    styles.push(tw`!border-danger-700`)
  }

  if (block) {
    styles.push(tw`!border-gray-300`)
  }

  if (isValid) {
    styles.push(tw`!border-success`)
  }

  return styles
})

const ErrorMsg = styled.span<{ danger: boolean; isValid?: boolean }>(({ danger, isValid }) => [
  tw`
    text-sm
    font-normal
    text-danger-500
  `,
  danger &&
    tw`
    text-danger-500
  `,
  isValid &&
    tw`
    text-success
  `,
])

const MsgBox: FC<{
  danger: boolean
  msg: string
  isValid?: boolean
}> = ({ danger, msg, isValid }) => {
  if (danger) {
    return <ErrorMsg danger={danger}>{msg}</ErrorMsg>
  }

  if (isValid === true) {
    return (
      <ErrorMsg danger={false} isValid={isValid}>
        {msg}
      </ErrorMsg>
    )
  }
  return <></>
}

export const TextField: FC<{
  required?: boolean
  placeholder?: string
  value?: string
  onChange: (e: any) => void
  msg?: string
  isValid?: boolean
}> = ({ required = false, placeholder = '', value, onChange, msg = '', isValid }) => {
  let danger = required && value === ''

  return (
    <ErrorBox>
      <InputBox
        danger={danger}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isValid={isValid}
      />
      <MsgBox danger={danger} msg={msg} isValid={isValid} />
    </ErrorBox>
  )
}
export const MultipleTextField: FC<{
  required?: boolean
  placeholder: string
  value: string
  onChange: (e: any) => void
  errorMsg?: string
  rows?: number
}> = ({ required = false, placeholder, value, onChange, errorMsg = '', rows = 3 }) => {
  const danger = required && value === ''

  return (
    <ErrorBox>
      <MultipleInputBox
        danger={danger}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
      <MsgBox danger={danger} msg={errorMsg} />
    </ErrorBox>
  )
}
