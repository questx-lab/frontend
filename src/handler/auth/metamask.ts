import { toast } from 'react-hot-toast'
import Web3 from 'web3'
import { provider } from 'web3-core'

import {
  linkWalletApi,
  loginMetamask,
  verifyMetaMask,
} from '@/app/api/client/wallet'
import { RouterConst } from '@/constants/router.const'
import { setAccessToken } from '@/utils/helper'
import detectEthereumProvider from '@metamask/detect-provider'
import { MetaMaskInpageProvider } from '@metamask/providers'

// *************** For Link Wallet MetaMask To Exist Account ***************
export const signWallet = async () => {
  const provider = await detectEthereumProvider()
  if (provider) {
    if (window && window.ethereum) {
      const ethereum = window.ethereum
      ethereum.on('accountsChanged', () => getConnectedAccounts(ethereum))
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      await linkWallet((accounts as string[])[0], ethereum)

      ethereum.removeListener('accountsChanged', getConnectedAccounts)
    }
  } else {
    toast.error('Please Install MetaMask.')
  }
}

const linkWallet = async (
  account: string,
  ethereum: MetaMaskInpageProvider
) => {
  try {
    const data = await loginMetamask(account)
    const w3 = new Web3(ethereum as provider)
    const signature = await w3.eth.personal.sign(data.data.nonce, account, '')
    const rs = await linkWalletApi(signature)
    if (rs.error) {
      toast(rs.error)
    } else {
      toast.success('Link wallet success')
    }
  } catch (error) {
    toast.error('Error when connect to account')
  }
}

// *************** For Register New Account MetaMask ***************
export const handleMetamask = async () => {
  const provider = await detectEthereumProvider()
  if (provider) {
    if (window && window.ethereum) {
      const ethereum = window.ethereum
      ethereum.on('accountsChanged', () => getConnectedAccounts(ethereum))
      const accounts = await getConnectedAccounts(ethereum)
      if (!accounts) {
        await connectWallet(ethereum)
      } else {
        if ((accounts as string[]).length) {
          await connectToServer((accounts as string[])[0], ethereum)
        } else {
          connectWallet(ethereum)
        }
      }
      ethereum.removeListener('accountsChanged', getConnectedAccounts)
    }
  } else {
    toast.error('Please Install MetaMask.')
  }
}

const connectToServer = async (
  account: string,
  ethereum: MetaMaskInpageProvider
) => {
  try {
    const data = await loginMetamask(account)
    const w3 = new Web3(ethereum as provider)
    const signature = await w3.eth.personal.sign(data.data.nonce, account, '')
    const rs = await verifyMetaMask(signature)
    setAccessToken(rs.data.access_token)
    window.location.href = RouterConst.HOME
  } catch (error) {
    toast.error('Error when login to server')
  }
}

const connectWallet = async (ethereum: MetaMaskInpageProvider) => {
  try {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    await connectToServer((accounts as string[])[0], ethereum)
  } catch (err) {}
}

const getConnectedAccounts = async (
  ethereum: MetaMaskInpageProvider
): Promise<unknown> => {
  try {
    const accounts = await ethereum.request({
      method: 'eth_accounts',
    })

    return accounts
  } catch (err) {
    toast.error('Get connect account error')
  }
}
