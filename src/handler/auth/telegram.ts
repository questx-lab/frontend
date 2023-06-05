import { linkTelegram } from '@/api/oauth'
import { TelegramAuthType } from '@/utils/type'

const convertData = (raw: any): TelegramAuthType => {
  return {
    id: `${raw.id}`,
    first_name: raw.first_name,
    last_name: raw.last_name,
    username: raw.username,
    auth_date: raw.auth_date,
    hash: raw.hash,
  }
}

export const handleLinkTelegram = async (data: any) => {
  try {
    const link = await linkTelegram(convertData(data))
    return link
  } catch (error) {}
}
