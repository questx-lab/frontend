import { action, Action, createStore } from 'easy-peasy'

import { AuthEnum } from '@/constants/common.const'
import { CollaboratorType, RefferalType, UserType } from '@/types'
import { CommunityType, FollowCommunityType } from '@/types/community'
import { QuestType } from '@/types/quest'

export interface GlobalStoreModel {
  showNavigationDrawer: boolean
  user: UserType | undefined
  communitiesFollowing: FollowCommunityType[]
  communitiesCollab: CollaboratorType[]
  referral: RefferalType
  authBox: number
  username: string
  showLoginModal: boolean
  showUserProfileModal: boolean
  templates: QuestType[]

  setShowNavigationDrawer: Action<GlobalStoreModel, boolean>
  setUser: Action<GlobalStoreModel, UserType>
  setCommunitiesFollowing: Action<GlobalStoreModel, FollowCommunityType[]>
  setCommunitiesCollab: Action<GlobalStoreModel, CollaboratorType[]>
  setReferral: Action<GlobalStoreModel, RefferalType>
  setAuthBox: Action<GlobalStoreModel, number>
  setUserName: Action<GlobalStoreModel, string>
  setShowLoginModal: Action<GlobalStoreModel, boolean>
  setTemplates: Action<GlobalStoreModel, QuestType[]>
  updateCommunityCollab: Action<GlobalStoreModel, CommunityType>
  setShowUserProfileModal: Action<GlobalStoreModel, boolean>
}

const store = createStore<GlobalStoreModel>({
  showNavigationDrawer: false,
  user: undefined,
  communitiesFollowing: [],
  communitiesCollab: [],
  referral: {},
  authBox: AuthEnum.LOGIN,
  username: '',
  showLoginModal: false,
  showUserProfileModal: false,
  templates: [],

  setShowNavigationDrawer: action((state, drawer) => {
    state.showNavigationDrawer = drawer
  }),

  setUser: action((state, user) => {
    state.user = user
  }),

  setCommunitiesFollowing: action((state, communities) => {
    state.communitiesFollowing = communities
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

  updateCommunityCollab: action((state, community) => {
    const clone = [...state.communitiesCollab]
    let found = false
    for (var collab of clone) {
      if (collab.community.handle === community.handle) {
        found = true
        collab.community = community
      }
    }

    if (found) {
      state.communitiesCollab = clone
    }
  }),

  setShowUserProfileModal: action((state, showUserProfileModal) => {
    state.showUserProfileModal = showUserProfileModal
  }),
})

export default store
