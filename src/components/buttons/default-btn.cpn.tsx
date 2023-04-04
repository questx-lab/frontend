import { MouseEventHandler } from 'react'

import { LoginHeaderBtn } from '@/styles/button.style'

export const LoginBtn = ({
  text,
  onClick,
}: {
  text: string
  onClick: MouseEventHandler
}) => {
  return <LoginHeaderBtn onClick={onClick}>{text}</LoginHeaderBtn>
}
