export type BlockchainConnectionType = {
  type: string
  url: string
}

export type BlockChainToken = {
  id: string
  name: string
  chain: string
  symbol: string
  address: string
  decimals: number
}

export type ChainType = {
  name: string
  id: number
  connections: BlockchainConnectionType[]
  currency_symbol: string
  tokens: BlockChainToken[]
}
