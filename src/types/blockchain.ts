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
}

export type ChainType = {
  name: string
  id: number
  connections: BlockchainConnectionType[]
}
