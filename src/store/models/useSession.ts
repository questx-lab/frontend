import { action, Action } from 'easy-peasy'

import { UserType } from '@/types/account.type'

import {
  userSessionAction,
  userUpdateAction,
} from '../actions/userSession.action'

export interface UserSessionModel {
  isLogin: boolean
  user: UserType
  updateState: Action<UserSessionModel, boolean>
  updateUser: Action<UserSessionModel, UserType>
}

const userSession: UserSessionModel = {
  isLogin: false,
  user: {},

  updateState: action(userSessionAction),
  updateUser: action(userUpdateAction),
}

export default userSession
