import { Gap } from '@/styles/common.style'
import {
  BoxContent,
  CircleRouded,
  TitleText,
  Wrap,
} from '@/styles/sidebar.style'

export default function SidebarCustom() {
  return (
    <Wrap>
      <TitleText>{'following'}</TitleText>
      <Gap />
      <BoxContent>
        <CircleRouded />
        <Gap />
        <CircleRouded />
        <Gap />
        <CircleRouded />
        <Gap />
        <CircleRouded />
      </BoxContent>
      <Gap />
      <BoxContent>
        <CircleRouded />
        <Gap />
        <CircleRouded />
        <Gap />
        <CircleRouded />
        <Gap />
        <CircleRouded />
      </BoxContent>
    </Wrap>
  )
}
