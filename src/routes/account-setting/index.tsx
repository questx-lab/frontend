import { FunctionComponent, useState } from 'react'

import tw from 'twin.macro'

import Achievement from '@/modules/account-setting/achievement'
import ControlPanel from '@/modules/account-setting/control-panel'
import General from '@/modules/account-setting/general'
import { SettingEnum } from '@/modules/account-setting/mini-widget'

const MainFrame = tw.div`
  w-full
  h-full
`

const RenderContent: FunctionComponent<{ settingActive: number }> = ({ settingActive }) => {
  if (settingActive === SettingEnum.ACHIEVEMENTS) {
    return <Achievement />
  }

  return <General />
}

export const Index: FunctionComponent = () => {
  const [settingActive, setSettingActive] = useState<number>(SettingEnum.GENERAL)

  return (
    <MainFrame>
      <ControlPanel settingActive={settingActive} setSettingActive={setSettingActive} />
      <RenderContent settingActive={settingActive} />
    </MainFrame>
  )
}
