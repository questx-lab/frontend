export type ReturnTuple<T> = {
  value?: T
  error?: string
}

export type WalletLoginRes = {
  error: number
  data: WalletData
}

export type WalletData = {
  nonce: string
}

export type WalletVerifyRes = {
  error: number
  data: {
    access_token: string
  }
}

export type Rsp<T> = {
  code: number
  data?: T
  error?: string
}

export type UserType = {
  id?: string
  wallet_address?: string
  name?: string
  services?: {
    discord?: string
    twitter?: string
    google?: string
  }
  is_new_user?: boolean
  role?: string
  referral_code?: string
}

export type UpdateCommunityRequest = {
  community_handle: string
  display_name: string
  introduction?: string
  twitter?: string
  discord?: string
  telegram?: string
  website_url?: string
}

export type UpdateCommunityResponse = {
  community: CommunityType
}

export type CollaboratorType = {
  name: string
  community: CommunityType
  user: UserType
  user_id: string
}

export type ReqNewCommunity = {
  display_name: string
  handle?: string
  introduction?: string
  telegram?: string
  website_url?: string
  discord?: string
  twitter?: string
}

export type CommunityType = {
  created_at?: string
  updated_at?: string
  created_by?: string
  display_name: string
  handle: string
  twitter?: string
  discord?: string
  telegram?: string
  introduction: string
  website_url?: string
  logo_url: string
  number_of_quests?: number
}

export type ListCommunitiesType = {
  communities: CommunityType[]
}

export type ReqNewRoleCommunity = {
  community_handle: string
  user_id: string
  name: string
}

export type ReqNewQuestType = {
  id?: string
  community_handle?: string
  type: string
  title: string
  description: string
  categories?: string[]
  recurrence: string
  points: number
  validation_data: ValidationQuest
  rewards?: RewardType[]
  condition_op?: string
  conditions?: []
  status?: string
  is_highlight: boolean
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
  quizzes?: QuestQuizType[]
}

// TODO: Move this to type/quest.ts
export interface QuestType {
  id: string
  community: string
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
    invite_url?: string
    twitter_handle?: string
    default_tweet?: string
    auto_validate?: boolean
    answer?: string
    space_url?: string
    number?: number
    quizzes?: QuestQuizType[]
  }
}

export type LQuestType = {
  quests: QuestType[]
}

export type ReqClaimReward = {
  quest_id?: string
  submission_data?: string
}

export type ClaimQuestType = {
  id: string
  quest: QuestType
  user: UserType
  status?: string
  submission_data?: string
  reviewer_at?: string
}

export type ListClaimQuestType = {
  claimed_quests: ClaimQuestType[]
}

export type CategoryType = {
  id: string
  name: string
  created_by: string
  created_at: string
  updated_at: string
}

export type LeaderboardType = {
  user_id?: string
  user?: UserType
  total_task: number
  total_point: number
  prev_rank: number
  current_rank: number
}

export type RefferalType = {
  total_claimable_communities?: number
  total_pending_communities?: number
  reward_amount?: number
}

export type QuestTwitterActionType = {
  action: string
  link: string
}

export type QuestQuizType = {
  id?: number
  question: string
  options: string[]
  answers: string[]
}

export type OAuth2VerifyResp = {
  error: string
  code: number
  data: {
    access_token: string
    refresh_token: string
    user: UserType
  }
}
