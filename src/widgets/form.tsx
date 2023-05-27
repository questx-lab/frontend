import { FunctionComponent } from 'react'

import { ErrorBox, ErrorMsg, InputBox, MulInputBox } from '@/styles/input.style'

const MsgBox: FunctionComponent<{
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

export const TextField: FunctionComponent<{
  required?: boolean
  placeholder: string
  value?: string
  onChange: (e: any) => void
  msg?: string
  isValid?: boolean
  min?: number
}> = ({
  required = false,
  placeholder,
  value,
  onChange,
  msg = '',
  isValid,
  min,
}) => {
  let danger = required && value === ''

  if (min && value) {
    if (value.length <= min) {
      danger = true
      msg = `Require more than ${min} charactors`
    }
  }

  // if (msg && !isValid) {
  //   danger = true
  // }

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

export const MultipleTextField: FunctionComponent<{
  required?: boolean
  placeholder: string
  value: string
  onChange: (e: any) => void
  errorMsg?: string
  rows?: number
}> = ({
  required = false,
  placeholder,
  value,
  onChange,
  errorMsg = '',
  rows = 3,
}) => {
  const danger = required && value === ''

  return (
    <ErrorBox>
      <MulInputBox
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
