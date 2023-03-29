import { persist } from 'easy-peasy'

import todos, { TodosModel } from './todos'
import userSession, { UserSessionModel } from './useSession'

export interface StoreModel {
  todos: TodosModel
  userSession: UserSessionModel
}

const model: StoreModel = {
  todos,
  userSession: persist(userSession),
}

export default model
