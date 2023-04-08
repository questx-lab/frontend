import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'

import { verifyOAuth2 } from '@/app/api/client/oauth'
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
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET,
        version: '2.0',
      }),
      Auth0Provider({
        clientId: process.env.AUTH0_ID,
        clientSecret: process.env.AUTH0_SECRET,
        issuer: process.env.AUTH0_ISSUER,
      }),
    ],
    theme: {
      colorScheme: 'light',
    },
    callbacks: {
      async jwt({ token, account }) {
        if (account?.provider == undefined) {
          return token
        }

        if (account?.access_token == undefined) {
          return token
        }

        const resp = await verifyOAuth2(
          account?.provider,
          account?.access_token
        )

        res.setHeader('Set-Cookie', [
          serialize(KeysEnum.QUESTX_TOKEN, resp.data.access_token, {
            path: '/',
            maxAge: 10 * 60,
          }),
          serialize(KeysEnum.REFRESH_TOKEN, resp.data.refresh_token, {
            path: '/',
            maxAge: 30 * 24 * 3600,
          }),
        ])

        return token
      },
    },
  })
}
