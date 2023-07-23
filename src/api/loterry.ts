import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types'
import { BuyLotteryTicketsType, CreateLotteryReq, LotteryEventType } from '@/types/lottery'

export const createLotteryEventApi = async (body: CreateLotteryReq): Promise<Rsp<{}>> => {
  const { data } = await api.post(EnvVariables.API_SERVER + '/createLotteryEvent', body)
  return data
}

export const getLotteryEventApi = async (
  communityHandle: string
): Promise<
  Rsp<{
    event: LotteryEventType
  }>
> => {
  const { data } = await api.get(
    EnvVariables.API_SERVER + `/getLotteryEvent?community_handle=${communityHandle}`
  )
  return data
}

export const buyLotteryTicketsApi = async (
  handle: string,
  amount: number
): Promise<Rsp<{ results: BuyLotteryTicketsType[] }>> => {
  const { data } = await api.post(EnvVariables.API_SERVER + '/buyLotteryTickets', {
    community_handle: handle,
    number_tickets: amount,
  })
  return data
}

export const claimLotteryWinnerApi = async (
  winner_id: string,
  wallet_address: string
): Promise<Rsp<{}>> => {
  const { data } = await api.post(EnvVariables.API_SERVER + '/claimLotteryWinner', {
    winner_id,
    wallet_address,
    chain: '',
  })
  return data
}
