import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { CharacterType, Rsp } from '@/types'
import { CommunityType } from '@/types/community'
import { LuckyBoxReq, RoomDataType } from '@/types/townhall'

export const getRoomsByCommunityApi = async (
  handle: string
): Promise<
  Rsp<{
    community: CommunityType
    game_rooms: RoomDataType[]
  }>
> => {
  try {
    const { data } = await api.get(
      EnvVariables.API_SERVER + `/getRoomsByCommunity?community_handle=${handle}`
    )

    return data
  } catch (err) {
    return {
      code: -1,
    }
  }
}

export const createLuckyBoxApi = async (body: LuckyBoxReq): Promise<Rsp<{}>> => {
  const { data } = await api.post(EnvVariables.API_SERVER + '/createLuckyboxEvent', body)
  return data
}

export const getMyCharactersApi = async (
  communityHandle: string
): Promise<Rsp<{ user_characters: CharacterType[] }>> => {
  try {
    const { data } = await api.get(
      EnvVariables.API_SERVER + `/getMyCharacters?community_handle=${communityHandle}`
    )

    return data
  } catch (err) {
    return {
      code: -1,
    }
  }
}
