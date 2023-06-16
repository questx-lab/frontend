import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityType, ReferralType } from '@/types/community'

interface AdminReferrallModel {
  referrals: ReferralType[]
  community: CommunityType | undefined
  showActiveModal: boolean
  action: string

  setCommunity: Action<AdminReferrallModel, CommunityType>
  setShowActiveModal: Action<AdminReferrallModel, boolean>
  setAction: Action<AdminReferrallModel, string>
  setReferrals: Action<AdminReferrallModel, ReferralType[]>
}

const AdminReferralStore = createContextStore<AdminReferrallModel>({
  community: undefined,
  showActiveModal: false,
  action: '',
  referrals: [],

  setCommunity: action((state, community) => {
    state.community = community
  }),

  setShowActiveModal: action((state, active) => {
    state.showActiveModal = active
  }),

  setAction: action((state, action) => {
    state.action = action
  }),

  setReferrals: action((state, referrals) => {
    state.referrals = referrals
  }),
})

export default AdminReferralStore
