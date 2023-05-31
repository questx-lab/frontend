import { serialize } from 'cookie'
import jwt from 'jwt-decode'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'

import {
  linkOAuth2,
  updateCommunityDiscord,
  verifyOAuth2,
} from '@/app/api/client/oauth'
import { EnvVariables } from '@/constants/env.const'
import { KeysEnum, Oauth2ProviderEnum } from '@/constants/key.const'
import { Rsp, UserType } from '@/utils/type'
import axios from 'axios'

const getUser = async (
  accessToken: string
): Promise<Rsp<UserType> | undefined> => {
  const result = await axios.get(EnvVariables.NEXT_PUBLIC_API_URL + '/getMe', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  let data = result.data
  if (data && data.code == 0) {
    return data.data
  }

  return undefined
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: EnvVariables.GOOGLE_ID,
        clientSecret: EnvVariables.GOOGLE_SECRET,
      }),
      TwitterProvider({
        clientId: EnvVariables.TWITTER_ID,
        clientSecret: EnvVariables.TWITTER_SECRET,
        version: '2.0',
      }),
      DiscordProvider({
        clientId: EnvVariables.DISCORD_ID,
        clientSecret: EnvVariables.DISCORD_SECRET,
      }),
      DiscordProvider({
        id: Oauth2ProviderEnum.DISCORD_BOT_PROVIDER,
        clientId: EnvVariables.DISCORD_ID,
        clientSecret: EnvVariables.DISCORD_SECRET,
        authorization: {
          params: {
            permission: EnvVariables.DISCORD_PERMISSION,
            scope: 'guilds bot',
          },
        },
      }),
    ],
    callbacks: {
      async jwt({ token, account }) {
        if (
          !account ||
          account.provider == undefined ||
          account.access_token == undefined
        ) {
          return token
        }

        const url = req.cookies['next-auth.callback-url']
        const accessToken = req.cookies['access_token']
        const matcher = '.*/communities/projects/.*/create'
        if (
          account.provider === Oauth2ProviderEnum.DISCORD_BOT_PROVIDER &&
          url &&
          url.match(matcher)
        ) {
          const arr = url.split('/')
          const community_handle = arr[arr.length - 2]
          type Guild = {
            id: string
          }
          const guild = account.guild as Guild
          const resp = await updateCommunityDiscord(
            community_handle,
            guild.id,

            account.access_token,
            accessToken || ''
          )

          return token
        }

        if (accessToken) {
          await linkOAuth2(account.provider, account.access_token, accessToken)
          return token
        }

        const resp = await verifyOAuth2(account.provider, account.access_token)

        const dAccessToken: any = jwt(resp.data.access_token)
        const dRefreshToken: any = jwt(resp.data.refresh_token)
        const accessExpiration =
          dAccessToken['exp'] - parseInt((Date.now() / 1000).toFixed(0))
        const refreshExpiration =
          dRefreshToken['exp'] - parseInt((Date.now() / 1000).toFixed(0))

        let headers = [
          serialize(KeysEnum.ACCESS_TOKEN, resp.data.access_token, {
            path: '/',
            maxAge: accessExpiration,
          }),
          serialize(KeysEnum.REFRESH_TOKEN, resp.data.refresh_token, {
            path: '/',
            maxAge: refreshExpiration,
          }),
        ]

        // Make a request to API server to get user
        let user = await getUser(resp.data.access_token)
        if (user) {
          headers.push(
            serialize(KeysEnum.USER, JSON.stringify(user || {}), {
              path: '/',
              maxAge: accessExpiration,
            })
          )
        }

        res.setHeader('Set-Cookie', headers)

        return token
      },
    },
  })
}
