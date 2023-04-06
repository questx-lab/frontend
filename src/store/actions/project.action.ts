import { FilterActionTypes, StateMapper } from 'easy-peasy'

import { ProjectType } from '@/types/project.type'

import { ProjectModel } from '../models/project'

export const projectAction = (
  state: StateMapper<FilterActionTypes<ProjectModel>>,
  payload: ProjectType
) => {
  state.curProject = payload
}
