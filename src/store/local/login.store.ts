import { action, Action, createContextStore } from 'easy-peasy'

import { AuthEnum } from '@/constants/common.const'

export interface LoginModel {
  username: string
  authBox: number

  setUserName: Action<LoginModel, string>
  setAuthBox: Action<LoginModel, number>
}

export const LoginStore = createContextStore<LoginModel>({
  username: '',
  authBox: AuthEnum.LOGIN,

  setUserName: action((state, username) => {
    state.username = username
  }),
  setAuthBox: action((state, auth) => {
    state.authBox = auth
  }),
})
