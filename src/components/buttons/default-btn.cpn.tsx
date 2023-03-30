import { MouseEventHandler } from 'react'

import { DefaultBtnBox } from '@/styles/button.style'

export default function DefaultBtnCpn({
  text,
  onClick,
}: {
  text: string
  onClick: MouseEventHandler
}) {
  return <DefaultBtnBox onClick={onClick}>{text}</DefaultBtnBox>
}
