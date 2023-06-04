import { action, Action, createContextStore } from 'easy-peasy'

import { SocialDisplay } from '@/constants/common.const'
import { AccoutSettingTabEnum } from '@/utils/type'

interface AccountSettingsModel {
  username: string
  inviteCode: string
  metamask: string
  socialDisplay: number
  tabType: number

  setUsername: Action<AccountSettingsModel, string>
  setInviteCode: Action<AccountSettingsModel, string>
  setMetaMask: Action<AccountSettingsModel, string>
  setSocialDisplay: Action<AccountSettingsModel, number>
  setTabType: Action<AccountSettingsModel, number>
}

const AccountSettingStore = createContextStore<AccountSettingsModel>({
  username: '',
  inviteCode: '',
  metamask: '',
  socialDisplay: SocialDisplay.NONE,
  tabType: AccoutSettingTabEnum.GENERAL,

  setUsername: action((state, username) => {
    state.username = username
  }),
  setInviteCode: action((state, code) => {
    state.inviteCode = code
  }),
  setMetaMask: action((state, address) => {
    state.metamask = address
  }),
  setSocialDisplay: action((state, social) => {
    state.socialDisplay = social
  }),
  setTabType: action((state, tab) => {
    state.tabType = tab
  }),
})

export default AccountSettingStore
