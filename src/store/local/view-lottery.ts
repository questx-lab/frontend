import { action, Action, createContextStore } from 'easy-peasy'

import { LotteryViewEnum } from '@/constants/common.const'
import { BuyLotteryTicketsType } from '@/types/lottery'

interface ViewLotteryModel {
  view: LotteryViewEnum
  ticketConvert: number
  pointConvert: number
  lotteryResults: BuyLotteryTicketsType[]

  setView: Action<ViewLotteryModel, LotteryViewEnum>
  setTicketConvert: Action<ViewLotteryModel, number>
  setPointConvert: Action<ViewLotteryModel, number>
  setLotteryResults: Action<ViewLotteryModel, BuyLotteryTicketsType[]>
}

const ViewLotteryStore = createContextStore<ViewLotteryModel>({
  view: LotteryViewEnum.CONVERT_POINT_TO_TICKET,
  ticketConvert: 0,
  pointConvert: 0,
  lotteryResults: [],

  setView: action((state, view) => {
    state.view = view
  }),

  setTicketConvert: action((state, amount) => {
    state.ticketConvert = amount
  }),

  setPointConvert: action((state, amount) => {
    state.pointConvert = amount
  }),

  setLotteryResults: action((state, results) => {
    state.lotteryResults = results
  }),
})

export default ViewLotteryStore
