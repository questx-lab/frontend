import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityType } from '@/types/community'

interface AdminCommunitylModel {
  community: CommunityType | undefined
  showActiveModal: boolean
  action: string

  setCommunity: Action<AdminCommunitylModel, CommunityType>
  setShowActiveModal: Action<AdminCommunitylModel, boolean>
  setAction: Action<AdminCommunitylModel, string>
}

const AdminCommunityStore = createContextStore<AdminCommunitylModel>({
  community: undefined,
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
})

export default AdminCommunityStore
