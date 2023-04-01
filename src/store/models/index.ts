import { persist } from 'easy-peasy'

import navBar, { NavBarModel } from './navBar'
import userSession, { UserSessionModel } from './useSession'

export interface StoreModel {
  userSession: UserSessionModel
  navBar: NavBarModel
}

const model: StoreModel = {
  userSession: persist(userSession),
  navBar,
}

export default model
