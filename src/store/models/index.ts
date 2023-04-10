import { persist } from 'easy-peasy'

import navBar, { NavBarModel } from './navBar'
import project, { ProjectModel } from './project'
import userSession, { UserSessionModel } from './useSession'

export interface StoreModel {
  userSession: UserSessionModel
  navBar: NavBarModel
  project: ProjectModel
}

const model: StoreModel = {
  userSession: persist(userSession),
  navBar,
  project: persist(project),
}

export default model
