export type BlockchainConnectionType = {
  type: string
  url: string
}

export type ChainType = {
  blockchain_connections: BlockchainConnectionType[]
}
