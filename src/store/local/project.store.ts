import { action, Action, createContextStore } from 'easy-peasy'

import { ProjectRoleEnum } from '@/constants/project.const'
import { ProjectType } from '@/types/project.type'

interface ProjectModel {
  project: ProjectType
  projects: ProjectType[]
  query: string
  searchProjects: ProjectType[]
  role: number

  setProject: Action<ProjectModel, ProjectType>
  setProjects: Action<ProjectModel, ProjectType[]>
  setQuery: Action<ProjectModel, string>
  setSearchProjects: Action<ProjectModel, ProjectType[]>
  setRole: Action<ProjectModel, number>
}

const NewProjectStore = createContextStore<ProjectModel>({
  project: { id: '' },
  projects: [],
  query: '',
  searchProjects: [],
  role: ProjectRoleEnum.GUESS,

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
})
export { NewProjectStore }
