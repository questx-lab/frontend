import { action, Action } from 'easy-peasy'

import { navBarAction } from '../actions/navBar.action'

export interface NavBarModel {
  isOpen: boolean
  updateState: Action<NavBarModel, boolean>
}

const navBar: NavBarModel = {
  isOpen: false,
  updateState: action(navBarAction),
}

export default navBar
