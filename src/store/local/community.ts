import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityRoleEnum } from '@/constants/common.const'
import { CommunityIndexMode, ControlPanelTab, emptyCommunity } from '@/types/community'
import { CategoryType, CommunityType, QuestType } from '@/utils/type'

interface CommunityModel {
  selectedCommunity: CommunityType
  query: string
  quests: QuestType[]
  searchProjects: CommunityType[]
  role: CommunityRoleEnum
  canEdit: boolean
  categories: CategoryType[]
  invitedBy: string
  activeControlPanelTab: number
  communityIndexMode: number

  setSelectedCommunity: Action<CommunityModel, CommunityType>
  setQuery: Action<CommunityModel, string>
  setSearchProjects: Action<CommunityModel, CommunityType[]>
  setRole: Action<CommunityModel, CommunityRoleEnum>
  setCategories: Action<CommunityModel, CategoryType[]>
  setInviteBy: Action<CommunityModel, string>
  setActiveControlPanelTab: Action<CommunityModel, number>
  setCommunityIndexMode: Action<CommunityModel, number>
  setQuests: Action<CommunityModel, QuestType[]>
}

const CommunityStore = createContextStore<CommunityModel>({
  selectedCommunity: emptyCommunity(),
  query: '',
  searchProjects: [],
  role: CommunityRoleEnum.GUEST,
  canEdit: false, // can edit community, add/edit quests.
  categories: [],
  invitedBy: '',
  quests: [],
  activeControlPanelTab: ControlPanelTab.QUESTS,
  communityIndexMode: CommunityIndexMode.VIEW_COMMUNITY,

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
    if (role === CommunityRoleEnum.OWNER || role === CommunityRoleEnum.EDITOR) {
      state.canEdit = true
    } else {
      state.canEdit = false
    }
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
  setCommunityIndexMode: action((state, communityIndexMode) => {
    state.communityIndexMode = communityIndexMode
  }),
  setQuests: action((state, quests) => {
    state.quests = quests
  }),
})
export { CommunityStore }
