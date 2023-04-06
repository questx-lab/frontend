import { action, Action } from 'easy-peasy'

import { ProjectType } from '@/types/project.type'

import { projectAction } from '../actions/project.action'

export interface ProjectModel {
  curProject: ProjectType
  upCurProject: Action<ProjectModel, ProjectType>
}

const project: ProjectModel = {
  curProject: {},
  upCurProject: action(projectAction),
}

export default project
