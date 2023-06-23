import { FC } from 'react'

import { ActionUpdate, BasicInfo } from '@/modules/account-setting/general/basic-info'
import { BodyFrame, PaddingVertical } from '@/modules/account-setting/mini-widget'
import { Text2xl } from '@/widgets/text'

const General: FC = () => {
  return (
    <BodyFrame>
      <PaddingVertical>
        <Text2xl>{'General'}</Text2xl>
      </PaddingVertical>
      <PaddingVertical>
        <BasicInfo />
        <ActionUpdate />
      </PaddingVertical>
    </BodyFrame>
  )
}

export default General
