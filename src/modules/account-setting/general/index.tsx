import { FunctionComponent } from 'react'

import { ActionUpdate, BasicInfo } from '@/modules/account-setting/general/basic-info'
import { BodyFrame, PaddingHorizontal } from '@/modules/account-setting/mini-widget'
import { UserStore } from '@/store/local/user.store'
import { Large2xlText } from '@/widgets/text'

const General: FunctionComponent = () => {
  return (
    <BodyFrame>
      <PaddingHorizontal>
        <Large2xlText>{'General'}</Large2xlText>
      </PaddingHorizontal>
      <UserStore.Provider>
        <PaddingHorizontal>
          <BasicInfo />
          <ActionUpdate />
        </PaddingHorizontal>
      </UserStore.Provider>
    </BodyFrame>
  )
}

export default General
