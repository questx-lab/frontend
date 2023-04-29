import { action, Action, createContextStore } from 'easy-peasy'

import { ProjectType } from '@/types/project.type'

interface ProjectModel {
  project: ProjectType

  onProjectChanged: Action<ProjectModel, ProjectType>
}

const NewProjectStore = createContextStore<ProjectModel>({
  project: { id: '' },

  onProjectChanged: action((state, newProject) => {
    state.project = newProject
  }),
})

export { NewProjectStore }
