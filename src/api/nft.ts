import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types'
import { NftType } from '@/types/community'
import { CreateNFTReq } from '@/types/nft'

export const createNFTApi = async (body: CreateNFTReq): Promise<Rsp<{}>> => {
  const { data } = await api.post(EnvVariables.API_SERVER + '/createNFT', body)
  return data
}

export const getNFTsApi = async (communityHandle: string): Promise<Rsp<{ nfts: NftType[] }>> => {
  const { data } = await api.get(
    EnvVariables.API_SERVER + `/getNFTsByCommunity?community_handle=${communityHandle}`
  )
  return data
}
