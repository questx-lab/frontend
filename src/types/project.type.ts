export type ReqNewProject = {
  name: string
  introdution?: string
  telegram?: string
  projectUrl?: string
  website?: string
  discord?: string
  twitter?: string
}

export type ReqUpdateProject = {
  id: string
  twitter?: string
  discord?: string
  telegram?: string
}

export type ProjectType = {
  id?: string
  created_at?: string
  updated_at?: string
  created_by?: string
  name?: string
  twitter?: string
  discord?: string
  telegram?: string
}

export type ListProjectsType = {
  projects: ProjectType[]
}

export type ReqNewRoleProject = {
  project_id: string
  user_id: string
  name: string
}

export type AwardType = {
  type: string
  value: string
}

export type ReqNewQuestType = {
  project_id: string
  type: string
  title: string
  description: string
  categories?: string[]
  recurrence: string
  validation_data: unknown
  awards: AwardType[]
  condition_op: string
  conditions: []
}

export type QuestType = {
  id?: string
  project_id?: string
  title?: string
  type?: string
  status?: string
  description?: string
  recurrence?: string
  condition_op?: string
  created_at?: string
  updated_at?: string
}

export type LQuestType = {
  quests: QuestType[]
}
