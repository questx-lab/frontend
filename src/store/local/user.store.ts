import { action, Action, createContextStore } from 'easy-peasy'

import { SocialDisplay } from '@/constants/common.const'

export interface UserStoreModel {
  username: string
  inviteCode: string
  metamask: string
  socialDisplay: number

  setUsername: Action<UserStoreModel, string>
  setInviteCode: Action<UserStoreModel, string>
  setMetaMask: Action<UserStoreModel, string>
  setSocialDisplay: Action<UserStoreModel, number>
}

export const UserStore = createContextStore<UserStoreModel>({
  username: '',
  inviteCode: '',
  metamask: '',
  socialDisplay: SocialDisplay.NONE,

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
})
