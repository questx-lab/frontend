import { FC } from 'react'

import { BodyFrame, PaddingVertical } from '@/modules/account-setting/mini-widget'
import { Text2xl } from '@/widgets/text'

const Achievement: FC = () => {
  return (
    <BodyFrame>
      <PaddingVertical>
        <Text2xl>{'Achievement'}</Text2xl>
      </PaddingVertical>
      <PaddingVertical></PaddingVertical>
    </BodyFrame>
  )
}
export default Achievement
