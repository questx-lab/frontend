import { ChannelType } from '@/types/chat'

export enum RouterConst {
  HOME = '/',
  QUESTBOARD = '/questercamp',
  QUESTBOARD_TRENDING = '/questercamp/trending',
  EXPLORE = '/explore',
  COMMUNITIES = '/communities',
  COMMUNITIES_TRENDING = '/communities/trending',
  CREATE_COMMUNITIES = '/communities/new ',
  USER = '/users/',
  TOWNHALL = '/townhall',
  ACCOUNT_SETTINGS = '/account-settings',
  MESSAGES = '/messages',
}

export const communityRoute = (communityHandle: string): string => {
  return `${RouterConst.COMMUNITIES}/${communityHandle}`
}

export const newQuestRoute = (communityHandle: string): string => {
  return `${communityRoute(communityHandle)}/create-quest`
}

export const editQuestRoute = (communityHandle: string): string => {
  return `${communityRoute(communityHandle)}/edit-quest`
}

export const messageRoute = (communityHandle: string, channel: ChannelType): string => {
  return `${RouterConst.MESSAGES}/${communityHandle}?channel=${channel.id.toString()}`
}

export const isMessagesRoute = (path: string): boolean => {
  return path.startsWith(RouterConst.MESSAGES)
}
