import toast from 'react-hot-toast'
import Web3 from 'web3'
import { provider } from 'web3-core'

import { getBlockchainApi } from '@/api/wallet'
import { ErrorCodes } from '@/constants/code.const'
import { balanceOfABI, transferABI } from '@/constants/contract'
import { EnvVariables } from '@/constants/env.const'
import { getConnectedAccounts } from '@/handler/auth/metamask'
import { ChainType } from '@/types/blockchain'
import detectEthereumProvider from '@metamask/detect-provider'

class WalletController {
  private chain: ChainType
  private web3?: Web3
  private etherWeb3: Web3

  getProvider() {
    if (this.chain.connections.length > 0) return this.chain.connections[0]
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
      connections: [],
      name: '',
      id: 0,
      currency_symbol: 'AVAX',
      tokens: [],
    }
    const ethereum = window.ethereum
    this.etherWeb3 = new Web3(ethereum as provider)
  }

  getToken() {
    return this.chain.tokens.find((token) => token.address === EnvVariables.USDT_ADDESS)
  }

  getBalance = async (wallet_address: string) => {
    const token = this.getToken()
    if (!this.web3 || !token) return undefined
    const tokenAddress = EnvVariables.USDT_ADDESS
    const contract = new this.web3.eth.Contract(balanceOfABI, tokenAddress)
    const result = await contract.methods.balanceOf(wallet_address).call()

    return result / Math.pow(10, token.decimals)
  }

  async getAccounts() {
    const ethereum = window.ethereum
    if (ethereum) {
      const resp = await getConnectedAccounts(ethereum)
      return resp as string[]
    }
    return []
  }

  async deposit(wallet_address: string, account: string, amount: number) {
    const provider = await detectEthereumProvider()
    const token = this.getToken()

    if (provider && token) {
      const contract = new this.etherWeb3.eth.Contract(transferABI, EnvVariables.USDT_ADDESS, {
        from: account,
      })
      const abi = contract.methods
        .transfer(wallet_address, this.etherWeb3.utils.toHex(amount * Math.pow(10, token.decimals)))
        .encodeABI()
      try {
        await this.etherWeb3.eth.sendTransaction({
          from: account,
          to: EnvVariables.USDT_ADDESS,
          gasPrice: this.etherWeb3.utils.toHex(30 * 1e9),
          gas: this.etherWeb3.utils.toHex(210000),
          data: abi,
        })
        toast.success('Deposit successful')
      } catch (error) {
        toast.error('Cannot deposit')
      }
    } else {
      toast.error('You should install metamask wallet before')
      window.open('https://metamask.io/download/', '_blank')
    }
  }

  async changeChain() {
    const chainId = `${this.chain.id}`
    console.log('this.chain', this.chain)

    const connections = this.chain.connections.map(
      (blockchain_connection) => `https://${blockchain_connection.url}`
    )

    const ethereum = window.ethereum
    if (ethereum && ethereum.networkVersion !== chainId) {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: this.etherWeb3.utils.toHex(chainId) }],
        })
      } catch (err: any) {
        // This error code indicates that the chain has not been added to MetaMask

        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: this.chain.name,
                chainId: this.etherWeb3.utils.toHex(chainId),
                nativeCurrency: {
                  name: this.chain.currency_symbol,
                  decimals: 18,
                  symbol: this.chain.currency_symbol,
                },
                rpcUrls: connections,
              },
            ],
          })
        } catch (error) {
          throw new Error('Can not switch chain')
        }
      }
    }
  }

  async checkMetamaskConnected() {
    const provider = await detectEthereumProvider()
    const accounts = await this.getAccounts()
    if (provider && accounts && accounts.length > 0) return true
    return false
  }

  async connectAccounts() {
    const ethereum = window.ethereum
    if (ethereum) {
      try {
        await ethereum.request({
          method: 'eth_requestAccounts',
        })
      } catch (error: any) {
        toast.error('Cannot connect metamask wallet')
      }
    }
  }
}
const walletController = new WalletController()

export default walletController
