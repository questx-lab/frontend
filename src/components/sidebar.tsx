import { Divider, Gap } from '@/styles/common.style'
import { BoxContent, CircleRouded, Wrap } from '@/styles/sidebar.style'

export default function SidebarCustom() {
  return (
    <Wrap>
      <BoxContent>
        <CircleRouded />
        <Gap />
        <CircleRouded />
        <Gap />
        <CircleRouded />
        <Gap />
        <CircleRouded />
      </BoxContent>
      <Divider />
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
