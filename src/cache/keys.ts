import { LeaderboardRangeEnum, LeaderboardSortType } from '@/constants/common.const'

export const leaderboardCacheKey = (
  communityHandle: string,
  range: LeaderboardRangeEnum,
  type: LeaderboardSortType
): string => {
  return `leaderboard###${communityHandle}###${range}###${type}`
}

export const streaksCacheKey = (communityHandle: string, date: string): string => {
  return `streak###${communityHandle}###${date}`
}
