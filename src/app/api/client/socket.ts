import { EnvVariables } from '@/constants/env.const'

import { api } from '../config/api'

export const socketConnectApi = async (broadcast: string) => {
  await api.get(EnvVariables.NEXT_PUBLIC_SOCKET_URL + `/ws/${broadcast}`)
}
