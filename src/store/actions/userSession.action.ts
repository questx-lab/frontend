import { FilterActionTypes, StateMapper } from 'easy-peasy'

import { UserType } from '@/types/account.type'

import { UserSessionModel } from '../models/useSession'

export const userSessionAction = (
  state: StateMapper<FilterActionTypes<UserSessionModel>>,
  payload: boolean
) => {
  state.isLogin = payload
}

export const userUpdateAction = (
  state: StateMapper<FilterActionTypes<UserSessionModel>>,
  payload: UserType
) => {
  state.user = payload
}
