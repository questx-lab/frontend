import { action, Action, createStore } from 'easy-peasy'

import { AuthEnum } from '@/constants/common.const'
import {
  CollaboratorType,
  CommunityType,
  RefferalType,
  UserType,
} from '@/utils/type'

export interface GlobalStoreModel {
  navBar: boolean
  isLogin: boolean
  user: UserType
  projectsFollowing: CommunityType[]
  projectsTrending: CommunityType[]
  projectCollab: CollaboratorType[]
  referral: RefferalType
  authBox: number
  username: string
  requireLogin: boolean

  setNavBar: Action<GlobalStoreModel, boolean>
  setLogin: Action<GlobalStoreModel, boolean>
  setUser: Action<GlobalStoreModel, UserType>
  setProjectsFollowing: Action<GlobalStoreModel, CommunityType[]>
  setProjectCollab: Action<GlobalStoreModel, CollaboratorType[]>
  setReferral: Action<GlobalStoreModel, RefferalType>
  setProjectsTrending: Action<GlobalStoreModel, CommunityType[]>
  setAuthBox: Action<GlobalStoreModel, number>
  setUserName: Action<GlobalStoreModel, string>
  setRequireLogin: Action<GlobalStoreModel, boolean>
}

const store = createStore<GlobalStoreModel>({
  navBar: false,
  isLogin: false,
  user: {},
  projectsFollowing: [],
  projectCollab: [],
  projectsTrending: [],
  referral: {},
  authBox: AuthEnum.LOGIN,
  username: '',
  requireLogin: false,

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

  setAuthBox: action((state, auth) => {
    state.authBox = auth
  }),

  setUserName: action((state, username) => {
    state.username = username
  }),

  setRequireLogin: action((state, require) => {
    state.requireLogin = require
  }),
})

export default store
