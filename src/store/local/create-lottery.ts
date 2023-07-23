import { action, Action, createContextStore } from 'easy-peasy'

import { RewardEnum } from '@/constants/common.const'
import { PrizeType } from '@/types/lottery'

export const initPrize: PrizeType = {
  rewards: [
    {
      type: RewardEnum.COIN,
      // TODO: currently only support usdt
      data: {
        chains: ['avaxc-testnet'],
        token: 'usdt',
        amount: 1,
      },
    },
  ],
  available_rewards: 1,
}

interface CreateLotteryModel {
  prizes: PrizeType[]
  startTime: Date
  endTime: Date
  maxTickets: number
  poinPerTicket: number

  setPrizes: Action<CreateLotteryModel, PrizeType[]>
  setStartTime: Action<CreateLotteryModel, Date>
  setEndTime: Action<CreateLotteryModel, Date>
  setMaxTickets: Action<CreateLotteryModel, number>
  setPointPerTicket: Action<CreateLotteryModel, number>
}

const CreateLotteryStore = createContextStore<CreateLotteryModel>({
  prizes: [initPrize],
  startTime: new Date(),
  endTime: new Date(),
  maxTickets: 10,
  poinPerTicket: 100,

  setPrizes: action((state, prizes) => {
    state.prizes = prizes
  }),

  setStartTime: action((state, time) => {
    state.startTime = time
  }),

  setEndTime: action((state, time) => {
    state.endTime = time
  }),

  setMaxTickets: action((state, amount) => {
    state.maxTickets = amount
  }),

  setPointPerTicket: action((state, amount) => {
    state.poinPerTicket = amount
  }),
})

export default CreateLotteryStore
