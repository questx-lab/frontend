import { action, Action, createContextStore } from 'easy-peasy'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import { ReferralType } from '@/types/community'

interface AdminPortalModel {
  activeTab: ControlPanelTab
  referrals: ReferralType[]

  setTab: Action<AdminPortalModel, ControlPanelTab>
  setReferrals: Action<AdminPortalModel, ReferralType[]>
}

const AdminPortalStore = createContextStore<AdminPortalModel>({
  activeTab: ControlPanelTab.NONE,
  referrals: [],

  setTab: action((state, activeTab) => {
    state.activeTab = activeTab
  }),

  setReferrals: action((state, referrals) => {
    state.referrals = referrals
  }),
})

export default AdminPortalStore
