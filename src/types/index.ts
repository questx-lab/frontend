import { UserChatStatusType } from '@/types/chat'
import { CommunityType } from '@/types/community'
import { BuyLotteryTicketsType } from '@/types/lottery'
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

// TODO: Move this to user
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
  avatar_url?: string
  total_communities?: number
  total_claimed_quests?: number
  status?: UserChatStatusType
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

export type ReqNewCommunity = {
  display_name: string
  handle?: string
  introduction?: string
  telegram?: string
  website_url?: string
  discord?: string
  twitter?: string
  owner_email?: string
  referral_code?: string
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
  category_id?: string
  recurrence: string
  points: number
  validation_data: ValidationQuest
  rewards?: RewardType[]
  condition_op?: string
  conditions?: ConditionType[]
  status?: string
  is_highlight: boolean
}

export type RewardType = {
  type?: string
  data: {
    points?: number
    role?: string
    token_address?: string
    chain?: string
    amount?: number
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
  position: number
  created_by?: string
  created_at?: string
  updated_at?: string
}

export const emptyCategory = () => {
  return {
    id: '',
    name: '',
    position: 0,
  }
}

export type LeaderboardType = {
  user_id?: string
  user?: UserType
  value: number
  previous_rank: number
  current_rank: number
}

export type RefferalType = {
  total_claimable_communities?: number
  total_pending_communities?: number
  reward_amount?: number
}

export type ClaimableTokenInfoType = {
  token_id: string
  token_symbol: string
  token_address: string
  chain: string
  amount: number
}

export type ClaimableRewardType = {
  referral_communities: CommunityType[]
  lottery_winners: BuyLotteryTicketsType[]
  total_claimable_tokens: ClaimableTokenInfoType[]
}

export type QuestTwitterActionType = {
  action: string
  link: string
  tweetId?: string
  included_words?: string[]
  twitter_name?: string
  twitter_photo_url?: string
  twitter_screen_name?: string
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
  HISTORY,
}

export enum SocialType {
  DISCORD = 'discord',
  TWITTER = 'twitter',
  GOOGLE = 'google',
  METAMASK = 'wallet',
}

export type DiscordRoleType = {
  name: string
  id: string
}

export type ListDiscordRoleType = {
  roles: DiscordRoleType[]
}

export type ConditionType = {
  type: string
  data: {
    op: string
    quest_id: string
  }
}

export type OpType = {
  id: string
  name: string
}
export type BadgeType = {
  name: string
  description: string
  icon_url: string
  level: number
}

export type BadgeDetailType = {
  // community: CommunityType
  // user: UserType
  badge: BadgeType
  // was_notified: boolean
}

export type CharacterType = {
  id: string
  name: string
  level: number
  config_url: string
  image_url: string
  thumbnail_url: string
  sprite_width_ratio: number
  sprite_height_ratio: number
}

export type RenderCategoryType = {
  id: string
  name: string
  quests: QuestType[]
}
