import { serialize } from 'cookie'
import jwt from 'jwt-decode'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'
import DiscordProvider from 'next-auth/providers/discord'

import { verifyOAuth2, linkOAuth2 } from '@/app/api/client/oauth'
import { EnvVariables } from '@/constants/env.const'
import { KeysEnum } from '@/constants/key.const'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
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
        console.log(req.query)
        // console.log(a);

        const accessToken = req.cookies['access_token']

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
