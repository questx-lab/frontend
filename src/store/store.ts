import { action, Action, createStore } from 'easy-peasy'

import { UserType } from '@/types/account.type'
import { ProjectType } from '@/types/project.type'

export interface GlobalStoreModel {
  navBar: boolean
  isLogin: boolean
  user: UserType
  projectsFollowing: ProjectType[]
  myProjects: ProjectType[]

  setNavBar: Action<GlobalStoreModel, boolean>
  setLogin: Action<GlobalStoreModel, boolean>
  setUser: Action<GlobalStoreModel, UserType>
  setProjectsFollowing: Action<GlobalStoreModel, ProjectType[]>
  setMyProjects: Action<GlobalStoreModel, ProjectType[]>
}

const store = createStore<GlobalStoreModel>({
  navBar: false,
  isLogin: false,
  user: {},
  projectsFollowing: [],
  myProjects: [],

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

  setMyProjects: action((state, projects) => {
    state.myProjects = projects
  }),
})

export default store
