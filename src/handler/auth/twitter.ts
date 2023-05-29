import { encode as base64encode } from 'base64-arraybuffer'

import { EnvVariables } from '@/constants/env.const'

export const TWITTER_STATE = 'twitter-increaser-state'
const TWITTER_AUTH_URL = 'https://twitter.com/i/oauth2/authorize'
const TWITTER_SCOPE = ['users.read', 'tweet.read', 'follows.read', 'follows.write'].join(' ')
const REDIRECT_URL = 'http://localhost:3001/oauth/twitter'

// const code_verifier = randomstring.generate(128)
const code_verifier = '8KxxO-RPl0bLSxX5AWwgdiFbMnry_VOKzFeIlVA7NoA'

async function generateCodeChallenge(codeVerifier: string) {
  localStorage.setItem('codeVerifier', codeVerifier)
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)

  const digest = await window.crypto.subtle.digest('SHA-256', data)
  const base64Digest = base64encode(digest)
  // you can extract this replacing code to a function
  const codeChalllenge = base64Digest.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  localStorage.setItem('codeChalllenge', codeChalllenge)
  return codeChalllenge
}
export const getURLWithQueryParams = (baseUrl: string, params: Record<string, any>) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')

  return `${baseUrl}?${query}`
}

export const getTwitterOAuthUrl = async (redirectUri: string) => {
  const rootUrl = TWITTER_AUTH_URL
  const options = {
    redirect_uri: REDIRECT_URL, // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
    // redirect_uri: 'http://localhost:3000/api/auth/callback/twitter', // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
    client_id: EnvVariables.TWITTER_ID,
    state: 'state',
    response_type: 'code',
    code_challenge: await generateCodeChallenge(code_verifier),
    code_challenge_method: 'S256',
    scope: TWITTER_SCOPE,
  }
  const qs = new URLSearchParams(options).toString()
  return `${rootUrl}?${qs}`
}
