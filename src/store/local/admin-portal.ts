import { action, Action, createContextStore } from 'easy-peasy'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'

interface AdminPortalModel {
  activeTab: ControlPanelTab

  setTab: Action<AdminPortalModel, ControlPanelTab>
}

const AdminPortalStore = createContextStore<AdminPortalModel>({
  activeTab: ControlPanelTab.NONE,

  setTab: action((state, activeTab) => {
    state.activeTab = activeTab
  }),
})

export default AdminPortalStore
