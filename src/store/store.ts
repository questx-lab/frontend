import { action, Action, createStore } from 'easy-peasy'

import { UserType } from '@/types/account.type'
import {
  CollaboratorType,
  ProjectType,
  RefferalType,
} from '@/types/project.type'

export interface GlobalStoreModel {
  navBar: boolean
  isLogin: boolean
  user: UserType
  projectsFollowing: ProjectType[]
  projectsTrending: ProjectType[]
  projectCollab: CollaboratorType[]
  referral: RefferalType

  setNavBar: Action<GlobalStoreModel, boolean>
  setLogin: Action<GlobalStoreModel, boolean>
  setUser: Action<GlobalStoreModel, UserType>
  setProjectsFollowing: Action<GlobalStoreModel, ProjectType[]>
  setProjectCollab: Action<GlobalStoreModel, CollaboratorType[]>
  setReferral: Action<GlobalStoreModel, RefferalType>
  setProjectsTrending: Action<GlobalStoreModel, ProjectType[]>
}

const store = createStore<GlobalStoreModel>({
  navBar: false,
  isLogin: false,
  user: {},
  projectsFollowing: [],
  projectCollab: [],
  projectsTrending: [],
  referral: {},

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

  setProjectsTrending: action((state, projects) => {
    state.projectsTrending = projects
  }),

  setProjectCollab: action((state, collabs) => {
    state.projectCollab = collabs
  }),

  setReferral: action((state, referral) => {
    state.referral = referral
  }),
})

export default store
