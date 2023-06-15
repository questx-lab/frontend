import { UserType } from '@/types'

export enum ControlPanelTab {
  QUESTS,
  REVIEW_SUBMISSION,
  SETTINGS,
}

export enum CommunityIndexMode {
  VIEW_COMMUNITY,
  CREATE_QUEST,
}

export type CommunityType = {
  created_at?: string
  updated_at?: string
  created_by?: UserType
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
}

export type FollowCommunityType = {
  community: CommunityType
  user: UserType
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
