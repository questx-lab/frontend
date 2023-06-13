import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityType } from '@/types/community'

interface AdminReferrallModel {
  community: CommunityType | undefined
  showActiveModal: boolean
  action: string

  setCommunity: Action<AdminReferrallModel, CommunityType>
  setShowActiveModal: Action<AdminReferrallModel, boolean>
  setAction: Action<AdminReferrallModel, string>
}

const AdminReferralStore = createContextStore<AdminReferrallModel>({
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

export default AdminReferralStore
