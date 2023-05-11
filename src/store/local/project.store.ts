import { action, Action, createContextStore } from 'easy-peasy'

import { ProjectRoleEnum } from '@/constants/project.const'
import { CategoryType, ProjectType } from '@/types/project.type'

interface ProjectModel {
  project: ProjectType
  projects: ProjectType[]
  query: string
  searchProjects: ProjectType[]
  role: number
  categories: CategoryType[]

  setProject: Action<ProjectModel, ProjectType>
  setProjects: Action<ProjectModel, ProjectType[]>
  setQuery: Action<ProjectModel, string>
  setSearchProjects: Action<ProjectModel, ProjectType[]>
  setRole: Action<ProjectModel, number>
  setCategories: Action<ProjectModel, CategoryType[]>
}

const NewProjectStore = createContextStore<ProjectModel>({
  project: { id: '' },
  projects: [],
  query: '',
  searchProjects: [],
  role: ProjectRoleEnum.GUEST,
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
export { NewProjectStore }
