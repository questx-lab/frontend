import { FC } from 'react'

import tw from 'twin.macro'

import Achievement from '@/modules/account-setting/achievement'
import ControlPanel from '@/modules/account-setting/control-panel'
import General from '@/modules/account-setting/general'
import AccountSettingsStore from '@/store/local/account-settings'
import { AccoutSettingTabEnum } from '@/types'

const MainFrame = tw.div`
  w-full
  h-full
`

const RenderContent: FC = () => {
  const tabActive = AccountSettingsStore.useStoreState((state) => state.tabType)

  if (tabActive === AccoutSettingTabEnum.ACHIEVEMENTS) {
    return <Achievement />
  }

  return <General />
}

const Index: FC = () => {
  return (
    <MainFrame>
      <AccountSettingsStore.Provider>
        <ControlPanel />
        <RenderContent />
      </AccountSettingsStore.Provider>
    </MainFrame>
  )
}

export default Index
