export type OAuth2VerifyResp = {
  error: number
  data: {
    access_token: string
    refresh_token: string
  }
}
