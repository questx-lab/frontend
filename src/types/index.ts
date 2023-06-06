import { CommunityType } from '@/types/community'
import { QuestType, ValidationQuest } from '@/types/quest'

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
    refresh_token: string
    user: UserType
  }
}

export type Rsp<T> = {
  code: number
  data?: T
  error?: string
}

export type UserType = {
  id: string
  wallet_address?: string
  name: string
  services?: {
    discord?: string
    twitter?: string
    google?: string
    telegram?: string
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

export type OAuth2VerifyResp = {
  error: string
  code: number
  data: {
    access_token: string
    refresh_token: string
    user: UserType
  }
}

export type OAuth2LinkReq = {
  type: string

  // For Authorization Code flow.
  access_token?: string

  // For Authorization Code with PKCE flow.
  code?: string
  code_verifier?: string
  redirect_uri?: string

  // For Implicit flow.
  id_token?: string
}

export type TelegramAuthType = {
  id: string
  first_name?: string
  last_name?: string
  username?: string
  auth_date?: number
  hash?: string
}

export type UploadCommunityLogoResponse = {
  url: string
}

export enum AccoutSettingTabEnum {
  GENERAL,
  ACHIEVEMENTS,
}

export enum SocialType {
  DISCORD = 'discord',
  TWITTER = 'twitter',
  GOOGLE = 'google',
  METAMASK = 'wallet',
}