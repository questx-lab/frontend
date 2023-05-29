import React, { FC, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { getTwitterAccessTokenApi } from '@/app/api/client/oauth'
import { EnvVariables } from '@/constants/env.const'

// add your client id and secret here:
const TWITTER_OAUTH_CLIENT_ID = EnvVariables.TWITTER_ID
const TWITTER_OAUTH_CLIENT_SECRET = EnvVariables.TWITTER_SECRET

// the url where we get the twitter access token from
const TWITTER_OAUTH_TOKEN_URL = 'https://api.twitter.com/2/oauth2/token'

// we need to encrypt our twitter client id and secret here in base 64 (stated in twitter documentation)
const BasicAuthToken = btoa(
  `${encodeURIComponent(TWITTER_OAUTH_CLIENT_ID)}:${encodeURIComponent(
    TWITTER_OAUTH_CLIENT_SECRET
  )}`
)

// filling up the query parameters needed to request for getting the token
export const twitterOauthTokenParams = {
  client_id: 'OEZrTkRPRVkxc3NwWmVnMmRJVlI6MTpjaQ',
  code_verifier: '8KxxO-RPl0bLSxX5AWwgdiFbMnry_VOKzFeIlVA7NoA',
  redirect_uri: `http://localhost:3000/api/auth/callback/twitter`,
  grant_type: 'authorization_code',
}

// the shape of the object we should recieve from twitter in the request
type TwitterTokenResponse = {
  token_type: 'bearer'
  expires_in: 7200
  access_token: string
  scope: string
}

// the main step 1 function, getting the access token from twitter using the code that twitter sent us
export const getTwitterOAuthToken = async (code: string) => {
  try {
    // POST request to the token url to get the access token
    const data = new URLSearchParams({ ...twitterOauthTokenParams, code }).toString()

    console.log(data)

    const rs = await getTwitterAccessTokenApi(data, {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${BasicAuthToken}`,
    })
    // console.log(`Basic ${BasicAuthToken}`)
    // const res = await axios.post<TwitterTokenResponse>(
    //   TWITTER_OAUTH_TOKEN_URL,
    //   new URLSearchParams({ ...twitterOauthTokenParams, code }).toString(),
    //   {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       Authorization: `Basic ${BasicAuthToken}`,
    //     },
    //   }
    // )
    return rs.data
  } catch (err) {
    console.error(err)
  }
}

const TwitterCallback: FC = () => {
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const authCode = searchParams.get('code')
    if (authCode) {
      getAccessTokenTwitter(authCode)
    }
    // Gửi authCode lên server để đổi lấy access token
  }, [location])

  const getAccessTokenTwitter = async (authCode: string) => {
    try {
      const data = await getTwitterOAuthToken(authCode)
      console.log(data)
    } catch (error) {}
  }

  return (
    <div>
      <p>loading...</p>
    </div>
  )
}

export default TwitterCallback
