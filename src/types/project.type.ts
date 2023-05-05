import { UserType } from './account.type'

export type ReqNewProject = {
  name: string
  introduction?: string
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
  id: string
  created_at?: string
  updated_at?: string
  created_by?: string
  name?: string
  twitter?: string
  discord?: string
  telegram?: string
  introduction?: string
}

export type ListProjectsType = {
  projects: ProjectType[]
}

export type ReqNewRoleProject = {
  project_id: string
  user_id: string
  name: string
}

export type ReqNewQuestType = {
  project_id: string
  type: string
  title: string
  description: string
  categories?: string[]
  recurrence: string
  validation_data: ValidationQuest
  rewards: RewardType[]
  condition_op: string
  conditions: []
}

export type RewardType = {
  type: string
  data: {
    points?: number
    role?: string
  }
}

export type ValidationQuest = {
  auto_validate?: boolean
  answer?: string
  question?: string
  options?: string[]
  link?: string
  included_words?: string[]
  default_tweet?: string
  twitter_handle?: string
  tweet_url?: string
  retweet?: boolean
  reply?: boolean
  like?: boolean
  space_url?: string
  invite_link?: string
  number?: number
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

export type ClaimQuestType = {
  id?: string
  quest_id?: string
  quest?: QuestType
  user_id?: string
  user?: UserType
  status?: string
  input?: string
  reviewer_at?: string
}

export type ListClaimQuestType = {
  claimed_quests: ClaimQuestType[]
}
