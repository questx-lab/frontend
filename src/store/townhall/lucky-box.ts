import { action, Action, createContextStore } from 'easy-peasy'

interface LuckyBoxModel {
  numberOfBox: number
  point: number
  usdt: number
  startDate: Date
  duration: number

  setNumberOfBox: Action<LuckyBoxModel, number>
  setPoint: Action<LuckyBoxModel, number>
  setUsdt: Action<LuckyBoxModel, number>
  setStartDate: Action<LuckyBoxModel, Date>
  setDuration: Action<LuckyBoxModel, number>
}

const LuckyBoxStore = createContextStore<LuckyBoxModel>({
  numberOfBox: 10,
  point: 100,
  usdt: 1,
  startDate: new Date(),
  duration: 10,

  setNumberOfBox: action((state, number) => {
    state.numberOfBox = number
  }),

  setPoint: action((state, point) => {
    state.point = point
  }),

  setUsdt: action((state, usdt) => {
    state.usdt = usdt
  }),

  setStartDate: action((state, date) => {
    state.startDate = date
  }),

  setDuration: action((state, duration) => {
    state.duration = duration
  }),
})

export default LuckyBoxStore
