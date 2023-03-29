import { FilterActionTypes, StateMapper } from 'easy-peasy'

import { UserSessionModel } from '../models/useSession'

export const userSessionAction = (
  state: StateMapper<FilterActionTypes<UserSessionModel>>,
  payload: boolean
) => {
  state.isLogin = payload
}
