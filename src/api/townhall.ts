import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { CharacterType, Rsp } from '@/types'

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

export const getCharactersApi = async (): Promise<Rsp<{ game_characters: CharacterType[] }>> => {
  try {
    const { data } = await api.get(EnvVariables.API_SERVER + `/getCharacters`)

    return data
  } catch (err) {
    return {
      code: -1,
    }
  }
}

export const getCommunityCharactersApi = async (
  community_handle: string
): Promise<Rsp<{ community_characters: CharacterType[] }>> => {
  try {
    const { data } = await api.get(
      EnvVariables.API_SERVER + `/getCommunityCharacters?community_handle=${community_handle}`
    )

    return data
  } catch (err) {
    return {
      code: -1,
    }
  }
}

export const getUserCharactersApi = async (
  userId: string,
  communityId: string
): Promise<Rsp<{ user_characters: CharacterType[] }>> => {
  try {
    const { data } = await api.get(
      EnvVariables.API_SERVER + `/getUserCharacters?community_id=${communityId}&user_id=${userId}`
    )

    return data
  } catch (err) {
    return {
      code: -1,
    }
  }
}

export const buyCharacterApi = async (
  communityHandle: string,
  characterId: string
): Promise<Rsp<{}>> => {
  try {
    const { data } = await api.post(EnvVariables.API_SERVER + `/buyCharacter`, {
      community_handle: communityHandle,
      character_id: characterId,
    })

    return data
  } catch (err) {
    return {
      code: -1,
    }
  }
}
