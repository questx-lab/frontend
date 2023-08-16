import { action, Action, createContextStore } from 'easy-peasy'

import { ActionReviewCommunityEnum } from '@/admin-portal/types/control-panel-tab'
import { CommunityType } from '@/types/community'

interface AdminCommunitylModel {
  communities: CommunityType[]
  community: CommunityType | undefined
  showActiveModal: boolean
  action: ActionReviewCommunityEnum

  setCommunity: Action<AdminCommunitylModel, CommunityType>
  setShowActiveModal: Action<AdminCommunitylModel, boolean>
  setAction: Action<AdminCommunitylModel, ActionReviewCommunityEnum>
  setCommunities: Action<AdminCommunitylModel, CommunityType[]>
  removeCommunity: Action<AdminCommunitylModel, CommunityType>
}

const AdminCommunityStore = createContextStore<AdminCommunitylModel>({
  community: undefined,
  communities: [],
  showActiveModal: false,
  action: ActionReviewCommunityEnum.ACTIVE,

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
