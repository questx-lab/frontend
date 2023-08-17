import { UserType } from '@/types'

export enum ControlPanelTab {
  QUESTS,
  REVIEW_SUBMISSION,
  LEADERBOARD,
  LOTTERY,
  SETTINGS,
  NFTS,
}

export type CommunityRoleType = {
  id: string
  name: string
  permission: bigint
  priority: number
  color: string
}

export enum CommunityIndexMode {
  VIEW_COMMUNITY,
  CREATE_QUEST,
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
  followers?: number
  status?: string
  referral_status?: string
  dau?: number
  discord_invite_link?: string
  chat_members?: UserType[]
  owner?: UserType
  owner_email?: string
}

export type FollowCommunityType = {
  community: CommunityType
  user: UserType
  role: CommunityRoleType[]
  streaks?: number
  points?: number
  quests?: number
  invite_code?: string
  invited_by?: string
  invite_count?: number
}

export const emptyCommunity = (): CommunityType => {
  return {
    display_name: '',
    handle: '',
    introduction: '',
    logo_url: '',
  }
}

export type ReferralType = {
  referred_by: UserType
  communities: CommunityType[]
}

export type CommunityStatsType = {
  date: string
  follower_count: number
}

export type NftType = {
  title: string
  quantity: number
  description: string
  image_url: string
  community_handle: string
  chain: string

  pending_amount: number
  active_amount: number
  failure_amount: number
}
