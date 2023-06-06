import { EnvVariables } from '@/constants/env.const'
import { Rsp, WalletLoginRes, WalletVerifyRes } from '@/types'

import { api } from './interceptor'

export const loginMetamask = async (account: string): Promise<WalletLoginRes> => {
  const result = await api.get(EnvVariables.API_SERVER + `/loginWallet?address=${account}`)

  return result.data
}

export const verifyMetaMask = async (signature: string): Promise<WalletVerifyRes> => {
  const result = await api.post(EnvVariables.API_SERVER + `/verifyWallet`, {
    signature,
  })
  return result.data
}

export const linkWalletApi = async (signature: string): Promise<Rsp<{}>> => {
  const result = await api.post(EnvVariables.API_SERVER + `/linkWallet`, {
    signature,
  })
  return result.data
}
