import { createStore, createTypedHooks } from 'easy-peasy'

import model, { StoreModel } from './models'

const { useStoreActions, useStoreDispatch, useStoreState } =
  createTypedHooks<StoreModel>()

export { useStoreActions, useStoreDispatch, useStoreState }

const store = createStore<StoreModel>(model)

export default store
