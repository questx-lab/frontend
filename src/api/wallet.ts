import { EnvVariables } from '@/constants/env.const'
import { Rsp, WalletLoginRes, WalletVerifyRes } from '@/types'
import Web3 from 'web3'

import { api } from './interceptor'
import { balanceOfABI } from '@/constants/contract'
import { ChainType } from '@/types/blockchain'
import { ErrorCodes } from '@/constants/code.const'

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

export const getBlockchainApi = async (): Promise<Rsp<{ chain: ChainType[] }>> => {
  const result = await api.get(
    EnvVariables.API_SERVER + `/getBlockchain?chain=${EnvVariables.CHAIN}`
  )
  return result.data
}

export const getBalanceApi = async (
  address: string,
  provider: string
): Promise<Rsp<{ balance: number }>> => {
  const tokenAddress = EnvVariables.USDT_ADDESS
  console.log('tokenAddress', tokenAddress)

  const web3 = new Web3(new Web3.providers.HttpProvider(provider))
  const contract = new web3.eth.Contract(balanceOfABI, tokenAddress)
  try {
    const result = await contract.methods.balanceOf(address).call()
    console.log('result', result)

    return {
      code: ErrorCodes.NOT_ERROR,
      data: {
        balance: result,
      },
    }
  } catch (error) {
    return {
      code: ErrorCodes.REQUEST_FAILED,
    }
  }
}
