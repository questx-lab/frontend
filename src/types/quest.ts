import { QuestRecurrence, QuestTypeEnum } from '@/constants/common.const'
import { CategoryType, RewardType } from '@/types'
import { CommunityType, emptyCommunity } from '@/types/community'

export type QuestQuizType = {
  id?: number
  question: string
  options: string[]
  answers: string[]
}

export interface QuestType {
  id: string
  community: CommunityType
  category_id?: string
  title: string
  type: string
  status: string
  description: string
  recurrence: string
  condition_op?: string
  created_at?: string
  updated_at?: string
  points: number
  rewards?: RewardType[]
  category: CategoryType
  validation_data: {
    tweet_url?: string
    like?: boolean
    reply?: boolean
    retweet?: boolean
    default_reply?: string
    link?: string
    invite_link?: string
    twitter_handle?: string
    default_tweet?: string
    auto_validate?: boolean
    answer?: string
    space_url?: string
    number?: number
    quizzes?: QuestQuizType[]
    group_link?: string
  }
}

export const emptyQuest = (): QuestType => {
  let q: QuestType = {
    id: '',
    community: emptyCommunity(),
    title: '',
    type: QuestTypeEnum.URL,
    status: '',
    description: '',
    recurrence: QuestRecurrence.ONCE,
    points: 100,
    rewards: [],
    category: {
      id: '',
      name: '',
      created_at: '',
      updated_at: '',
      created_by: '',
    },
    validation_data: {},
  }

  return q
}
