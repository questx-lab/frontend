import { action, Action, createContextStore } from 'easy-peasy'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import { ReferralType, CommunityType } from '@/types/community'

interface AdminPortalModel {
  activeTab: ControlPanelTab
  referrals: ReferralType[]
  communities: CommunityType[]

  setTab: Action<AdminPortalModel, ControlPanelTab>
  setReferrals: Action<AdminPortalModel, ReferralType[]>
  setCommunities: Action<AdminPortalModel, CommunityType[]>
}

const AdminPortalStore = createContextStore<AdminPortalModel>({
  activeTab: ControlPanelTab.NONE,
  referrals: [],
  communities: [],

  setTab: action((state, activeTab) => {
    state.activeTab = activeTab
  }),

  setReferrals: action((state, referrals) => {
    state.referrals = referrals
  }),

  setCommunities: action((state, communities) => {
    state.communities = communities
  }),
})

export default AdminPortalStore
