import { getBlockchainApi } from '@/api/wallet'
import { ErrorCodes } from '@/constants/code.const'
import { balanceOfABI } from '@/constants/contract'
import { EnvVariables } from '@/constants/env.const'
import { getConnectedAccounts } from '@/handler/auth/metamask'
import { ChainType } from '@/types/blockchain'
import detectEthereumProvider from '@metamask/detect-provider'
import toast from 'react-hot-toast'
import Web3 from 'web3'
import { provider } from 'web3-core'

class WalletController {
  private chain: ChainType
  private web3?: Web3

  getProvider() {
    if (this.chain.blockchain_connections.length > 0) return this.chain.blockchain_connections[0]
    return undefined
  }

  async fetchChain() {
    const resp = await getBlockchainApi(EnvVariables.CHAIN)
    if (resp.code === ErrorCodes.NOT_ERROR && resp.data && resp.data.chain.length > 0) {
      this.chain = resp.data.chain[0]
    }
    const provider = this.getProvider()

    if (provider) this.web3 = new Web3(new Web3.providers.HttpProvider(`https://${provider?.url}`))
  }

  constructor() {
    this.chain = {
      blockchain_connections: [],
    }
    this.fetchChain()
  }

  getBalance = async (wallet_address: string) => {
    if (!this.web3) return undefined
    const tokenAddress = EnvVariables.USDT_ADDESS
    const contract = new this.web3.eth.Contract(balanceOfABI, tokenAddress)
    const result = await contract.methods.balanceOf(wallet_address).call()
    return result
  }

  async deposit(wallet_address: string) {
    const provider = await detectEthereumProvider()

    if (provider && window && window.ethereum) {
      const ethereum = window.ethereum
      const resp = await getConnectedAccounts(ethereum)
      const accounts = resp as string[]

      if (accounts && accounts.length > 0) {
        const connectedAccount = accounts[0]
        const w3 = new Web3(ethereum as provider)
        try {
          await w3.eth.sendTransaction({
            from: connectedAccount,
            to: EnvVariables.USDT_ADDESS,
            // data: JSON.stringify({}),
          })
        } catch (error) {
          toast.error('Cannot deposit')
        }
      }
    }
  }
}
const walletController = new WalletController()

export default walletController
