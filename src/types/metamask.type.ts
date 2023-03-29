export type WalletLoginRes = {
  error: number
  data: WalletData
}

export type WalletData = {
  nonce: string
}

export type WalletVerifyRes = {
  error: number
  data: {
    access_token: string
  }
}
