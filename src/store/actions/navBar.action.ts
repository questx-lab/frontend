import { FilterActionTypes, StateMapper } from 'easy-peasy'

import { NavBarModel } from '../models/navBar'

export const navBarAction = (
  state: StateMapper<FilterActionTypes<NavBarModel>>,
  payload: boolean
) => {
  state.isOpen = payload
}
