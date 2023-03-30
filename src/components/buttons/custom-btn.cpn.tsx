import { MouseEventHandler } from 'react'

import { FullWidthBtnBox } from '@/styles/button.style'

export const FullWidthBtn = ({
  text,
  onClick,
}: {
  text: string
  onClick: MouseEventHandler
}) => {
  return <FullWidthBtnBox onClick={onClick}>{text}</FullWidthBtnBox>
}
