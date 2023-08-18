import { UserType } from '@/types'

export const hasDiscord = (user: UserType): boolean => {
  if (user.services) {
    return user.services.discord !== undefined && user.services.discord.length > 0
  }

  return false
}

export const hasWalletAddress = (user: UserType): boolean => {
  if (user.wallet_address) {
    return true
  }

  return false
}
