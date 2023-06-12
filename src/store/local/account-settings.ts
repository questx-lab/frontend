import { action, Action, createContextStore } from 'easy-peasy'

import { SocialDisplay } from '@/constants/common.const'
import { AccoutSettingTabEnum } from '@/types'

interface AccountSettingsModel {
  username: string
  inviteCode: string
  metamask: string
  socialDisplay: number
  tabType: number
  avatar: File | undefined

  setUsername: Action<AccountSettingsModel, string>
  setInviteCode: Action<AccountSettingsModel, string>
  setMetaMask: Action<AccountSettingsModel, string>
  setSocialDisplay: Action<AccountSettingsModel, number>
  setTabType: Action<AccountSettingsModel, number>
  setAvatar: Action<AccountSettingsModel, File | undefined>
}

const AccountSettingsStore = createContextStore<AccountSettingsModel>({
  username: '',
  inviteCode: '',
  metamask: '',
  socialDisplay: SocialDisplay.NONE,
  tabType: AccoutSettingTabEnum.GENERAL,
  avatar: undefined,

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
  setAvatar: action((state, avatar) => {
    state.avatar = avatar
  }),
})

export default AccountSettingsStore
