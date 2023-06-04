import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import Achievement from '@/modules/account-setting/achievement'
import ControlPanel from '@/modules/account-setting/control-panel'
import General from '@/modules/account-setting/general'
import AccountSettingStore from '@/store/local/account-setting.store'
import { AccoutSettingTabEnum } from '@/utils/type'

const MainFrame = tw.div`
  w-full
  h-full
`

const RenderContent: FunctionComponent = () => {
  const tabActive = AccountSettingStore.useStoreState((state) => state.tabType)

  if (tabActive === AccoutSettingTabEnum.ACHIEVEMENTS) {
    return <Achievement />
  }

  return <General />
}

export const Index: FunctionComponent = () => {
  return (
    <MainFrame>
      <AccountSettingStore.Provider>
        <ControlPanel />
        <RenderContent />
      </AccountSettingStore.Provider>
    </MainFrame>
  )
}
