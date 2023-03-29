import { action, Action } from 'easy-peasy'

import { userSessionAction } from '../actions/userSession.action'

export interface UserSessionModel {
  isLogin: boolean
  updateState: Action<UserSessionModel, boolean>
}

const userSession: UserSessionModel = {
  isLogin: false,
  updateState: action(userSessionAction),
}

export default userSession
