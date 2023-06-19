import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types'
import { CommunityType } from '@/types/community'
import { RoomDataType } from '@/types/townhall'

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
