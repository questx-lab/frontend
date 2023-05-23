import { EnvVariables } from '@/constants/env.const'
import { Rsp, WalletLoginRes, WalletVerifyRes } from '@/utils/type'

import { api } from '../config/api'

export const loginMetamask = async (
  account: string
): Promise<WalletLoginRes> => {
  const result = await api.get(
    EnvVariables.NEXT_PUBLIC_API_URL + `/loginWallet?address=${account}`
  )

  return result.data
}

export const verifyMetaMask = async (
  signature: string
): Promise<WalletVerifyRes> => {
  const result = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + `/verifyWallet`,
    {
      signature,
    }
  )
  return result.data
}

export const linkWalletApi = async (signature: string): Promise<Rsp<{}>> => {
  const result = await api.post(
    EnvVariables.NEXT_PUBLIC_API_URL + `/linkWallet`,
    {
      signature,
    }
  )
  return result.data
}
