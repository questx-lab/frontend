import { action, Action, createStore } from 'easy-peasy'

import { UserType } from '@/types/account.type'
import { CollaboratorType, ProjectType } from '@/types/project.type'

export interface GlobalStoreModel {
  navBar: boolean
  isLogin: boolean
  user: UserType
  projectsFollowing: ProjectType[]
  projectCollab: CollaboratorType[]

  setNavBar: Action<GlobalStoreModel, boolean>
  setLogin: Action<GlobalStoreModel, boolean>
  setUser: Action<GlobalStoreModel, UserType>
  setProjectsFollowing: Action<GlobalStoreModel, ProjectType[]>
  setProjectCollab: Action<GlobalStoreModel, CollaboratorType[]>
}

const store = createStore<GlobalStoreModel>({
  navBar: false,
  isLogin: false,
  user: {},
  projectsFollowing: [],
  projectCollab: [],

  setNavBar: action((state, navBar) => {
    state.navBar = navBar
  }),

  setLogin: action((state, isLogin) => {
    state.isLogin = isLogin
  }),

  setUser: action((state, user) => {
    state.user = user
  }),

  setProjectsFollowing: action((state, projects) => {
    state.projectsFollowing = projects
  }),

  setProjectCollab: action((state, collabs) => {
    state.projectCollab = collabs
  }),
})

export default store
