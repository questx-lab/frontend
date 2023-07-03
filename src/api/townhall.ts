import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import StorageConst from '@/constants/storage.const'
import { Rsp } from '@/types'
import { CommunityType } from '@/types/community'
import { LuckyBoxReq, RoomDataType, SetType } from '@/types/townhall'

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

export const getMySetsApi = async (): Promise<Rsp<{ sets: SetType[] }>> => {
  const sets: SetType[] = [
    {
      id: '1',
      img_url: '/images/characters/adam.svg',
      name: 'adam',
    },
    {
      id: '2',
      img_url: '/images/characters/nancy.svg',
      name: 'nancy',
    },
    {
      id: '3',
      img_url: '/images/characters/ash.svg',
      name: 'ash',
    },
    {
      id: '4',
      img_url: '/images/characters/lucy.svg',
      name: 'lucy',
    },
    {
      id: '5',
      img_url: '/images/characters/adam.svg',
      name: 'adam',
    },
  ]

  return {
    code: 0,
    data: {
      sets,
    },
  }
}

export const getSetListApi = async (): Promise<Rsp<{ sets: SetType[] }>> => {
  const sets: SetType[] = [
    {
      id: '1',
      img_url: '/images/characters/adam.svg',
      name: 'adam',
    },
    {
      id: '2',
      img_url: '/images/characters/nancy.svg',
      name: 'nancy',
    },
    {
      id: '3',
      img_url: '/images/characters/ash.svg',
      name: 'ash',
    },
    {
      id: '4',
      img_url: '/images/characters/lucy.svg',
      name: 'lucy',
    },
    {
      id: '5',
      img_url: '/images/characters/adam.svg',
      name: 'adam',
    },
  ]

  return {
    code: 0,
    data: {
      sets,
    },
  }
}
