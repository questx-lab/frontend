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
  address?: string
  name?: string
  services?: {
    discord?: string
    twitter?: string
    google?: string
  }
  is_new_user?: boolean
  role?: string
  referral_code?: string
  points?: number
  gems?: number
  avatar_url?: string
  level?: string
  quest_completed?: number
  community_joined?: number
}

export type ReqNewCommunity = {
  name: string
  introduction?: string
  telegram?: string
  websiteUrl?: string
  website?: string
  discord?: string
  twitter?: string
}

export type ReqUpdateCommunity = {
  id: string
  name?: string
  introduction?: string
  twitter?: string
  discord?: string
  telegram?: string
  team_size?: number
  development_stage?: string
  website_url?: string
  shared_content_types?: string[]
}

export type CollaboratorType = {
  name: string
  community: CommunityType
  community_id: string
  user: UserType
  user_id: string
}

export type CommunityType = {
  id: string
  created_at?: string
  updated_at?: string
  created_by?: string
  name?: string
  twitter?: string
  discord?: string
  telegram?: string
  introduction?: string
  website_url?: string
  logo_url?: string
}

export type ListCommunitiesType = {
  communities: CommunityType[]
}

export type ReqNewRoleCommunity = {
  community_id: string
  user_id: string
  name: string
}

export type ReqNewQuestType = {
  id: string
  community_id: string
  type: string
  title: string
  description: string
  categories?: string[]
  recurrence: string
  validation_data: ValidationQuest
  rewards: RewardType[]
  condition_op: string
  conditions: []
  status?: string
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
  telegram_invite_link?: string
  discord_invite_link?: string
  number?: number
  quizzes?: QuestQuizType[]
}

export interface QuestType {
  id?: string
  community_id?: string
  title?: string
  type?: string
  status?: string
  description?: string
  recurrence?: string
  condition_op?: string
  created_at?: string
  updated_at?: string
  rewards?: RewardType[]
  category?: CategoryType
  validation_data?: {
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
  input?: string
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
  error: number
  data: {
    access_token: string
    refresh_token: string
  }
}

export type BadgeType = {
  user_id: string
  community: CommunityType
  name: string
  level: string
  was_notified: boolean
  logo: string
  tags: string[]
  gems: string
}

export type UserProfileType = {
  level: string
  gems: string
  xp: string
  quest_completed: number
  community_joined: number
  badges: BadgeType[]
  user_image_url: string
}

export type FollowerType = {
  user_id: string
  points: number
  invite_code: string
  invited_by: string
  invite_count: number
  avatar_url: string
  community_name: string
  tags: string[]
}
