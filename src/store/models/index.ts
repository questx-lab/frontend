import { persist } from 'easy-peasy'

import userSession, { UserSessionModel } from './useSession'

export interface StoreModel {
  userSession: UserSessionModel
}

const model: StoreModel = {
  userSession: persist(userSession),
}

export default model
