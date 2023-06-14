export const EnvVariables = {
  MODE: process.env.REACT_APP_MODE,
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL,
  API_SERVER: process.env.REACT_APP_SERVER_API || '',
  GOOGLE_ID: process.env.REACT_APP_GOOGLE_ID || '',
  TWITTER_ID: process.env.REACT_APP_TWITTER_ID || '',
  DISCORD_ID: process.env.REACT_APP_DISCORD_ID || '',
  DISCORD_PERMISSION: process.env.REACT_APP_DISCORD_PERMISSION || '',
  TELEGRAM_BOT_NAME: process.env.REACT_APP_TELEGRAM_BOT_NAME || '',
  TOWNHALL_ASSET_CDN: process.env.REACT_APP_TOWNHALL_ASSET_CDN || '',
}
