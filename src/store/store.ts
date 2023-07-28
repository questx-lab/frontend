import { action, Action, createStore } from 'easy-peasy'

import { AuthEnum } from '@/constants/common.const'
import { RefferalType, UserType } from '@/types'
import { CommunityType, FollowCommunityType } from '@/types/community'
import { QuestType } from '@/types/quest'

export interface GlobalStoreModel {
  showNavigationDrawer: boolean
  user: UserType | undefined
  communitiesFollowing: FollowCommunityType[]
  myCommunities: CommunityType[]
  referral: RefferalType
  authBox: number
  showLoginModal: boolean
  showUserProfileModal: boolean
  templates: QuestType[]
  hasEvent: boolean

  setShowNavigationDrawer: Action<GlobalStoreModel, boolean>
  setUser: Action<GlobalStoreModel, UserType>
  setCommunitiesFollowing: Action<GlobalStoreModel, FollowCommunityType[]>
  setMyCommunities: Action<GlobalStoreModel, CommunityType[]>
  setReferral: Action<GlobalStoreModel, RefferalType>
  setAuthBox: Action<GlobalStoreModel, number>
  setShowLoginModal: Action<GlobalStoreModel, boolean>
  setTemplates: Action<GlobalStoreModel, QuestType[]>
  updateMyCommunities: Action<GlobalStoreModel, CommunityType>
  setShowUserProfileModal: Action<GlobalStoreModel, boolean>
  setHasEvent: Action<GlobalStoreModel, boolean>
}

const store = createStore<GlobalStoreModel>({
  showNavigationDrawer: false,
  user: undefined,
  communitiesFollowing: [],
  myCommunities: [],
  referral: {},
  authBox: AuthEnum.LOGIN,
  showLoginModal: false,
  showUserProfileModal: false,
  templates: [],
  hasEvent: false,

  setShowNavigationDrawer: action((state, drawer) => {
    state.showNavigationDrawer = drawer
  }),

  setUser: action((state, user) => {
    state.user = user
  }),

  setCommunitiesFollowing: action((state, communities) => {
    state.communitiesFollowing = communities
  }),

  setMyCommunities: action((state, communities) => {
    state.myCommunities = communities
  }),

  setReferral: action((state, referral) => {
    state.referral = referral
  }),

  setAuthBox: action((state, auth) => {
    state.authBox = auth
  }),

  setShowLoginModal: action((state, require) => {
    state.showLoginModal = require
  }),

  setTemplates: action((state, templates) => {
    state.templates = templates
  }),

  setHasEvent: action((state, event) => {
    state.hasEvent = event
  }),

  updateMyCommunities: action((state, community) => {
    const clone = [...state.myCommunities]
    let found = false
    for (var collab of clone) {
      if (collab.handle === community.handle) {
        found = true
        collab = community
      }
    }

    if (found) {
      state.myCommunities = clone
    }
  }),

  setShowUserProfileModal: action((state, showUserProfileModal) => {
    state.showUserProfileModal = showUserProfileModal
  }),
})

export default store
