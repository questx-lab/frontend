import { action, Action, createContextStore } from 'easy-peasy'

import { TabReviewEnum } from '@/constants/project.const'
import { ProjectType } from '@/types/project.type'

interface ProjectModel {
  project: ProjectType
  tabReview: number

  onProjectChanged: Action<ProjectModel, ProjectType>
  onTabReviewChanged: Action<ProjectModel, number>
}

const NewProjectStore = createContextStore<ProjectModel>({
  project: { id: '' },
  tabReview: TabReviewEnum.PENDING,

  onProjectChanged: action((state, newProject) => {
    state.project = newProject
  }),

  onTabReviewChanged: action((state, tab) => {
    state.tabReview = tab
  }),
})

export { NewProjectStore }
