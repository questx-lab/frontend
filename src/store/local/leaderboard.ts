import { action, Action, createContextStore } from 'easy-peasy'

import { LeaderboardType } from '@/types'

export interface LeaderboardModel {
  week: LeaderboardType[]
  month: LeaderboardType[]
  all: LeaderboardType[]

  setWeek: Action<LeaderboardModel, LeaderboardType[]>
  setMonth: Action<LeaderboardModel, LeaderboardType[]>
  setAll: Action<LeaderboardModel, LeaderboardType[]>
}

const LeaderboardStore = createContextStore<LeaderboardModel>({
  week: [],
  month: [],
  all: [],

  setWeek: action((state, quest) => {
    state.week = quest
  }),

  setMonth: action((state, quest) => {
    state.month = quest
  }),

  setAll: action((state, quest) => {
    state.all = quest
  }),
})

export default LeaderboardStore
