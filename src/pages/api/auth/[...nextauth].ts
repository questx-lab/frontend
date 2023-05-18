import { serialize } from 'cookie'
import jwt from 'jwt-decode'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'

import {
  linkOAuth2,
  updateProjectDiscord,
  verifyOAuth2,
} from '@/app/api/client/oauth'
import { EnvVariables } from '@/constants/env.const'
import { KeysEnum } from '@/constants/key.const'

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
        authorization: {
          params: { permission: 268435488, scope: 'guilds bot' },
        },
      }),
    ],
    callbacks: {
      async jwt({ token, account }) {
        if (account?.provider == undefined) {
          return token
        }

        if (account?.access_token == undefined) {
          return token
        }
        const url = req.cookies['next-auth.callback-url']
        const accessToken = req.cookies['access_token']
        const matcher = '.*/communities/projects/.*/create'
        if (url && url.match(matcher)) {
          const arr = url.split('/')
          const project_id = arr[arr.length - 2]
          type Guild = {
            id: string
          }
          const guild = account.guild as Guild
          const resp = await updateProjectDiscord(
            project_id,
            guild.id,

            account?.access_token,
            accessToken || ''
          )

          return token
        }

        if (accessToken) {
          const resp = await linkOAuth2(
            account?.provider,
            account?.access_token,
            accessToken
          )
          return token
        }

        const resp = await verifyOAuth2(
          account?.provider,
          account?.access_token
        )

        const dAccessToken: any = jwt(resp.data.access_token)
        const dRefreshToken: any = jwt(resp.data.refresh_token)

        res.setHeader('Set-Cookie', [
          serialize(KeysEnum.QUESTX_TOKEN, resp.data.access_token, {
            path: '/',
            maxAge:
              dAccessToken['exp'] - parseInt((Date.now() / 1000).toFixed(0)),
          }),
          serialize(KeysEnum.REFRESH_TOKEN, resp.data.refresh_token, {
            path: '/',
            maxAge:
              dRefreshToken['exp'] - parseInt((Date.now() / 1000).toFixed(0)),
          }),
        ])

        return token
      },
    },
  })
}
