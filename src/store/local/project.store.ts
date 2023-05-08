import { action, Action, createContextStore } from 'easy-peasy'

import { ProjectType } from '@/types/project.type'

interface ProjectModel {
  project: ProjectType
  projects: ProjectType[]
  query: string
  searchProjects: ProjectType[]

  setProject: Action<ProjectModel, ProjectType>
  setProjects: Action<ProjectModel, ProjectType[]>
  setQuery: Action<ProjectModel, string>
  setSearchProjects: Action<ProjectModel, ProjectType[]>
}

const NewProjectStore = createContextStore<ProjectModel>({
  project: { id: '' },
  projects: [],
  query: '',
  searchProjects: [],

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
})

export { NewProjectStore }
