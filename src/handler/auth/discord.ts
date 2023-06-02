import { EnvVariables } from '@/constants/env.const'

const DISCORD_AUTH_URL = 'https://discordapp.com/oauth2/authorize'

const CALLBACK_URL = `${EnvVariables.FRONTEND_URL}/api/auth/callback/discord`

const OAuthData = new URLSearchParams({
  response_type: 'code',
  client_id: EnvVariables.DISCORD_ID,
  redirect_uri: CALLBACK_URL,
})

const getDiscordOauthUrl = async ({
  joinCommunity,
  communityHandle,
}: {
  joinCommunity: boolean
  communityHandle: string
}) => {
  if (joinCommunity) {
    OAuthData.append('permissions', EnvVariables.DISCORD_PERMISSION)
    OAuthData.append('scope', 'guilds bot')
    OAuthData.append('state', communityHandle)
  } else {
    OAuthData.append('scope', 'identify')
  }

  return `${DISCORD_AUTH_URL}?${OAuthData}`
}

export const handleLoginDiscord = async ({
  joinCommunity = false,
  communityHandle = '',
}: {
  joinCommunity?: boolean
  communityHandle?: string
}) => {
  window.location.assign(await getDiscordOauthUrl({ joinCommunity, communityHandle }))
}
