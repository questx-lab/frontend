import { action, Action, createStore } from 'easy-peasy'

import { AuthEnum } from '@/constants/common.const'
import { CollaboratorType, CommunityType, QuestType, RefferalType, UserType } from '@/utils/type'

export interface GlobalStoreModel {
  showNavigationDrawer: boolean
  user: UserType | undefined
  communitiesFollowing: CommunityType[]
  communitiesTrending: CommunityType[]
  communitiesCollab: CollaboratorType[]
  referral: RefferalType
  authBox: number
  username: string
  showLoginModal: boolean
  templates: QuestType[]

  setShowNavigationDrawer: Action<GlobalStoreModel, boolean>
  setUser: Action<GlobalStoreModel, UserType>
  setCommunitiesFollowing: Action<GlobalStoreModel, CommunityType[]>
  setCommunitiesTrending: Action<GlobalStoreModel, CommunityType[]>
  setCommunitiesCollab: Action<GlobalStoreModel, CollaboratorType[]>
  setReferral: Action<GlobalStoreModel, RefferalType>
  setAuthBox: Action<GlobalStoreModel, number>
  setUserName: Action<GlobalStoreModel, string>
  setShowLoginModal: Action<GlobalStoreModel, boolean>
  setTemplates: Action<GlobalStoreModel, QuestType[]>
}

const store = createStore<GlobalStoreModel>({
  showNavigationDrawer: false,
  user: undefined,
  communitiesFollowing: [],
  communitiesCollab: [],
  communitiesTrending: [],
  referral: {},
  authBox: AuthEnum.LOGIN,
  username: '',
  showLoginModal: false,
  templates: [],

  setShowNavigationDrawer: action((state, drawer) => {
    state.showNavigationDrawer = drawer
  }),

  setUser: action((state, user) => {
    state.user = user
  }),

  setCommunitiesFollowing: action((state, projects) => {
    state.communitiesFollowing = projects
  }),

  setCommunitiesTrending: action((state, projects) => {
    state.communitiesTrending = projects
  }),

  setCommunitiesCollab: action((state, collabs) => {
    state.communitiesCollab = collabs
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

  setShowLoginModal: action((state, require) => {
    state.showLoginModal = require
  }),

  setTemplates: action((state, templates) => {
    state.templates = templates
  }),
})

export default store
