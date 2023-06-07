import { QuestRecurrence, QuestTypeEnum } from '@/constants/common.const'
import { CategoryType, CollaboratorType, RewardType, UserType } from '@/types'
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
  is_highlight?: boolean
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
    included_words?: string[]
    twitter_name?: string
    twitter_photo_url?: string
    twitter_screen_name?: string
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

export type ValidationQuest = {
  auto_validate?: boolean
  answer?: string
  question?: string
  options?: string[]
  link?: string
  included_words?: string[]
  default_tweet?: string
  default_reply?: string
  twitter_handle?: string
  tweet_url?: string
  retweet?: boolean
  reply?: boolean
  like?: boolean
  space_url?: string
  invite_link?: string
  group_link?: string
  number?: number
  quizzes?: QuestQuizType[]
}

export const canClaimQuest = (
  quest: QuestType,
  myCommunities: CollaboratorType[],
  user: UserType
): boolean => {
  if (!user) {
    return false
  }

  // Check if user is the editor of this community
  if (myCommunities) {
    for (let communityCollab of myCommunities) {
      if (communityCollab.community.handle === quest.community.handle) {
        // Editor cannot claim quest
        return false
      }
    }
  }

  // This is a guest
  return true
}
