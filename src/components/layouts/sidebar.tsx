import { Gap } from '@/styles/common.style'
import { BoxContent, CircleRouded, Wrap } from '@/styles/sidebar.style'

export default function SidebarCustom() {
  return (
    <Wrap>
      <p className='text-xs text-black font-bold mt-6'>{'following'}</p>
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
