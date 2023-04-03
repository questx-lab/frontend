import { EnvVariables } from '@/constants/env.const'
import { WalletLoginRes, WalletVerifyRes } from '@/types/metamask.type'

import { api } from '../config/api'

export const loginMetamask = async (
  account: string
): Promise<WalletLoginRes> => {
  const result = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/wallet/login?address=${account}`
  )

  return result.data
}

export const verifyMetaMask = async (
  signature: string
): Promise<WalletVerifyRes> => {
  const result = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/wallet/verify?signature=${signature}`
  )
  console.log('result', result)
  return result.data
}
