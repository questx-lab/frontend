import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityRoleEnum } from '@/constants/common.const'
import { CategoryType, CommunityType } from '@/utils/type'
import { ControlPanelTab } from '@/types/community'

interface CommunityModel {
  selectedCommunity: CommunityType | undefined
  query: string
  searchProjects: CommunityType[]
  role: number
  categories: CategoryType[]
  invitedBy: string
  activeControlPanelTab: number

  setSelectedCommunity: Action<CommunityModel, CommunityType>
  setQuery: Action<CommunityModel, string>
  setSearchProjects: Action<CommunityModel, CommunityType[]>
  setRole: Action<CommunityModel, number>
  setCategories: Action<CommunityModel, CategoryType[]>
  setInviteBy: Action<CommunityModel, string>
  setActiveControlPanelTab: Action<CommunityModel, number>
}

const CommunityStore = createContextStore<CommunityModel>({
  selectedCommunity: undefined,
  query: '',
  searchProjects: [],
  role: CommunityRoleEnum.GUEST,
  categories: [],
  invitedBy: '',
  activeControlPanelTab: ControlPanelTab.QUESTS,

  setSelectedCommunity: action((state, newProject) => {
    state.selectedCommunity = newProject
  }),

  setQuery: action((state, query) => {
    state.query = query
  }),

  setSearchProjects: action((state, projects) => {
    state.searchProjects = projects
  }),

  setRole: action((state, role) => {
    state.role = role
  }),

  setCategories: action((state, categories) => {
    state.categories = categories
  }),

  setInviteBy: action((state, invitedBy) => {
    state.invitedBy = invitedBy
  }),

  setActiveControlPanelTab: action((state, activeControlPanelTab) => {
    state.activeControlPanelTab = activeControlPanelTab
  }),
})
export { CommunityStore }
