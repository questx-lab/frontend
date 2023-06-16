export enum RouterConst {
  HOME = '/',
  QUESTBOARD = '/questercamp',
  QUESTBOARD_TRENDING = '/questercamp/trending',
  EXPLORE = '/explore',
  COMMUNITIES = '/communities',
  COMMUNITIES_TRENDING = '/communities/trending',
  CREATE_COMMUNITIES = '/communities/new ',
  USER = '/users/',
  ACCOUNT_SETTINGS = '/account-settings',
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
