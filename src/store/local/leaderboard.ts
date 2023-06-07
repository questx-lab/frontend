import { action, Action, createContextStore } from 'easy-peasy'

import { LeaderboardType } from '@/types'

export interface LeaderboardModel {
  week: LeaderboardType[]
  month: LeaderboardType[]

  setWeek: Action<LeaderboardModel, LeaderboardType[]>
  setMonth: Action<LeaderboardModel, LeaderboardType[]>
}

const LeaderboardStore = createContextStore<LeaderboardModel>({
  week: [],
  month: [],

  setWeek: action((state, quest) => {
    state.week = quest
  }),

  setMonth: action((state, quest) => {
    state.month = quest
  }),
})

export default LeaderboardStore
