import { FunctionComponent } from 'react'

import { ActionUpdate, BasicInfo } from '@/modules/account-setting/general/basic-info'
import { BodyFrame, PaddingHorizontal } from '@/modules/account-setting/mini-widget'
import { Text2xl } from '@/widgets/text'

const General: FunctionComponent = () => {
  return (
    <BodyFrame>
      <PaddingHorizontal>
        <Text2xl>{'General'}</Text2xl>
      </PaddingHorizontal>
      <PaddingHorizontal>
        <BasicInfo />
        <ActionUpdate />
      </PaddingHorizontal>
    </BodyFrame>
  )
}

export default General
