import { FunctionComponent } from 'react'

import { ErrorBox, ErrorMsg, InputBox, MulInputBox } from '@/styles/input.style'

const Error: FunctionComponent<{ danger: boolean; errorMsg: string }> = ({
  danger,
  errorMsg,
}) => {
  if (danger) {
    return <ErrorMsg>{errorMsg}</ErrorMsg>
  }
  return <></>
}

export const TextField: FunctionComponent<{
  required?: boolean
  placeholder: string
  value: string
  onChange: (e: any) => void
  errorMsg?: string
}> = ({ required = false, placeholder, value, onChange, errorMsg = '' }) => {
  const danger = required && value === ''

  return (
    <ErrorBox>
      <InputBox
        danger={danger}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Error danger={danger} errorMsg={errorMsg} />
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
      <Error danger={danger} errorMsg={errorMsg} />
    </ErrorBox>
  )
}
