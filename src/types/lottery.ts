import { RewardType, UserType } from '@/types'
import { CommunityType } from '@/types/community'

export type PrizeType = {
  id?: string
  event_id?: string
  rewards: RewardType[]
  available_rewards: number
}

export type CreateLotteryReq = {
  community_handle: string
  start_time: string
  end_time: string
  max_tickets: number
  point_per_ticket: number
  prizes: PrizeType[]
}

export type LotteryEventType = {
  id: string
  community: CommunityType
  start_time: string
  end_time: string
  max_tickets: number
  used_tickets: number
  point_per_ticket: number
  prizes: PrizeType[]
}

export type BuyLotteryTicketsType = {
  id: string
  prize: PrizeType
  user: UserType
}
