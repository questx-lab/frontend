import { serialize } from 'cookie'
import jwt from 'jwt-decode'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import DiscordProvider from 'next-auth/providers/discord'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'

import { verifyOAuth2, updateProjectDiscord } from '@/app/api/client/oauth'
import { EnvVariables } from '@/constants/env.const'
import { KeysEnum } from '@/constants/key.const'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { project_id, type } = req.query

  return await NextAuth(req, res, {
    providers: [
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: EnvVariables.GOOGLE_ID,
        clientSecret: EnvVariables.GOOGLE_SECRET,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET,
        version: '2.0',
      }),
      DiscordProvider({
        clientId: process.env.DISCORD_ID,
        clientSecret: process.env.DISCORD_SECRET,
        authorization: {
          params: { permission: 268435488, scope: 'guilds bot' },
        },
      }),
      Auth0Provider({
        clientId: process.env.AUTH0_ID,
        clientSecret: process.env.AUTH0_SECRET,
        issuer: process.env.AUTH0_ISSUER,
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
          console.log('project_id', project_id)
          console.log(' account?.guild?.id', account?.guild?.id)

          await updateProjectDiscord(
            project_id,
            account?.guild?.id || '',
            accessToken || '',
            account?.access_token
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
