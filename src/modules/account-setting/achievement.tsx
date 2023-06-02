import { FunctionComponent } from 'react'

import { BodyFrame, PaddingHorizontal } from '@/modules/account-setting/mini-widget'
import { Large2xlText } from '@/widgets/text'

const Achievement: FunctionComponent = () => {
  return (
    <BodyFrame>
      <PaddingHorizontal>
        <Large2xlText>{'Achievement'}</Large2xlText>
      </PaddingHorizontal>
      <PaddingHorizontal></PaddingHorizontal>
    </BodyFrame>
  )
}
export default Achievement
