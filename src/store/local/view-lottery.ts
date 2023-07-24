import { action, Action, createContextStore } from 'easy-peasy'

import { LotteryViewEnum } from '@/constants/common.const'
import { BuyLotteryTicketsType, LotteryEventType } from '@/types/lottery'

interface ViewLotteryModel {
  view: LotteryViewEnum
  ticketConvert: number
  pointConvert: number
  lotteryResults: BuyLotteryTicketsType[]
  lotteryEvent: LotteryEventType | undefined

  setView: Action<ViewLotteryModel, LotteryViewEnum>
  setTicketConvert: Action<ViewLotteryModel, number>
  setPointConvert: Action<ViewLotteryModel, number>
  setLotteryResults: Action<ViewLotteryModel, BuyLotteryTicketsType[]>
  setLotteryEvent: Action<ViewLotteryModel, LotteryEventType>
}

const ViewLotteryStore = createContextStore<ViewLotteryModel>({
  view: LotteryViewEnum.CONVERT_POINT_TO_TICKET,
  ticketConvert: 0,
  pointConvert: 0,
  lotteryResults: [],
  lotteryEvent: undefined,

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

  setLotteryEvent: action((state, event) => {
    state.lotteryEvent = event
  }),
})

export default ViewLotteryStore
