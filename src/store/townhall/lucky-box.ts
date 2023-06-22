import { action, Action, createContextStore } from 'easy-peasy'

interface LuckyBoxModel {
  numberOfBox: number
  point: number

  setNumberOfBox: Action<LuckyBoxModel, number>
  setPoint: Action<LuckyBoxModel, number>
}

const LuckyBoxStore = createContextStore<LuckyBoxModel>({
  numberOfBox: 0,
  point: 1,

  setNumberOfBox: action((state, number) => {
    state.numberOfBox = number
  }),

  setPoint: action((state, point) => {
    state.point = point
  }),
})

export default LuckyBoxStore
