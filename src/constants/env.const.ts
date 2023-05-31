export const EnvVariables = {
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL,
  NEXT_PUBLIC_API_URL: process.env.REACT_APP_SERVER_API || '',
  GOOGLE_ID: process.env.REACT_APP_GOOGLE_ID || '',
  TWITTER_ID: process.env.REACT_APP_TWITTER_ID || '',
  TWITTER_SECRET: process.env.REACT_APP_TWITTER_SECRET || '',
  DISCORD_ID: process.env.DISCORD_ID,
  DISCORD_PERMISSION: process.env.DISCORD_PERMISSION,
}
