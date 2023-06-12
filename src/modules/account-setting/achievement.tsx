import { FunctionComponent } from 'react'

import { BodyFrame, PaddingHorizontal } from '@/modules/account-setting/mini-widget'
import { Text2xl } from '@/widgets/text'

const Achievement: FunctionComponent = () => {
  return (
    <BodyFrame>
      <PaddingHorizontal>
        <Text2xl>{'Achievement'}</Text2xl>
      </PaddingHorizontal>
      <PaddingHorizontal></PaddingHorizontal>
    </BodyFrame>
  )
}
export default Achievement
