import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityType } from '@/types/community'

interface AdminCommunitylModel {
  communities: CommunityType[]
  community: CommunityType | undefined
  showActiveModal: boolean
  action: string

  setCommunity: Action<AdminCommunitylModel, CommunityType>
  setShowActiveModal: Action<AdminCommunitylModel, boolean>
  setAction: Action<AdminCommunitylModel, string>
  setCommunities: Action<AdminCommunitylModel, CommunityType[]>
  removeCommunity: Action<AdminCommunitylModel, CommunityType>
}

const AdminCommunityStore = createContextStore<AdminCommunitylModel>({
  community: undefined,
  communities: [],
  showActiveModal: false,
  action: '',

  setCommunity: action((state, community) => {
    state.community = community
  }),

  setShowActiveModal: action((state, active) => {
    state.showActiveModal = active
  }),

  setAction: action((state, action) => {
    state.action = action
  }),

  setCommunities: action((state, communities) => {
    state.communities = communities
  }),

  removeCommunity: action((state, community) => {
    const newCommunities = []
    for (let c of state.communities) {
      if (c.handle !== community.handle) {
        newCommunities.push(c)
      }
    }

    state.communities = newCommunities
  }),
})

export default AdminCommunityStore
