import { api } from '@/api/interceptor'
import { EnvVariables } from '@/constants/env.const'
import { Rsp } from '@/types'
import { ChannelsType, ChatMessagesType, UserChatStatusType, UserChatType } from '@/types/chat'

export const getChannelsApi = async (handle: string): Promise<Rsp<ChannelsType>> => {
  const res = await api.get(EnvVariables.API_SERVER + `/getChannels?community_handle=${handle}`)
  return res.data
}

export const sendMessageApi = async (channelId: BigInt, msg: string) => {
  await api.post(EnvVariables.API_SERVER + `/createMessage`, {
    channel_id: channelId,
    content: msg,
    attachments: [],
  })
}

export const getUsersApi = async (): Promise<Rsp<UserChatType[]>> => {
  const data: UserChatType[] = [
    {
      user: {
        id: '0',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.ONLINE,
      shordStatus: 'hi fen',
    },
    {
      user: {
        id: '1',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.ONLINE,
      shordStatus: '',
    },
    {
      user: {
        id: '2',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.ONLINE,
      shordStatus: '',
    },
    {
      user: {
        id: '3',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.ONLINE,
      shordStatus: '',
    },
    {
      user: {
        id: '4',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.ONLINE,
      shordStatus: '',
    },
    {
      user: {
        id: '5',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.BUSY,
      shordStatus: '',
    },
    {
      user: {
        id: '6',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.BUSY,
      shordStatus: '',
    },
    {
      user: {
        id: '7',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.BUSY,
      shordStatus: 'hi fen',
    },
    {
      user: {
        id: '8',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.BUSY,
      shordStatus: 'hi fen',
    },
    {
      user: {
        id: '9',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.OFFLINE,
      shordStatus: '',
    },
    {
      user: {
        id: '10',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.OFFLINE,
      shordStatus: 'hi fen',
    },
    {
      user: {
        id: '11',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.OFFLINE,
      shordStatus: '',
    },
    {
      user: {
        id: '12',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.OFFLINE,
      shordStatus: 'hi fen',
    },
    {
      user: {
        id: '13',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.OFFLINE,
      shordStatus: '',
    },
    {
      user: {
        id: '14',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.OFFLINE,
      shordStatus: '',
    },
    {
      user: {
        id: '15',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.OFFLINE,
      shordStatus: 'hi fen',
    },
    {
      user: {
        id: '16',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.OFFLINE,
      shordStatus: '',
    },
    {
      user: {
        id: '17',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.OFFLINE,
      shordStatus: '',
    },
    {
      user: {
        id: '18',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.OFFLINE,
      shordStatus: 'hi fen',
    },
    {
      user: {
        id: '19',
        name: 'CoolCat93',
      },
      status: UserChatStatusType.OFFLINE,
      shordStatus: '',
    },
  ]

  const result: Rsp<UserChatType[]> = {
    code: 0,
    data,
  }

  return Promise.resolve(result)
}

export const getMessagesApi = async (
  channel_id: BigInt,
  last_message_id: BigInt
): Promise<Rsp<ChatMessagesType>> => {
  const res = await api.get(
    EnvVariables.API_SERVER +
      `/getMessages?channel_id=${channel_id}&last_message_id=${last_message_id}&limit=50`
  )

  return res.data
}
