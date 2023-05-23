import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityRoleEnum } from '@/constants/common.const'
import { CategoryType, CommunityType } from '@/utils/type'

interface CommunityModel {
  project: CommunityType
  projects: CommunityType[]
  query: string
  searchProjects: CommunityType[]
  role: number
  categories: CategoryType[]

  setProject: Action<CommunityModel, CommunityType>
  setProjects: Action<CommunityModel, CommunityType[]>
  setQuery: Action<CommunityModel, string>
  setSearchProjects: Action<CommunityModel, CommunityType[]>
  setRole: Action<CommunityModel, number>
  setCategories: Action<CommunityModel, CategoryType[]>
}

const CommunityStore = createContextStore<CommunityModel>({
  project: { id: '' },
  projects: [],
  query: '',
  searchProjects: [],
  role: CommunityRoleEnum.GUEST,
  categories: [],

  setProject: action((state, newProject) => {
    state.project = newProject
  }),

  setProjects: action((state, projects) => {
    state.projects = projects
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
})
export { CommunityStore }
