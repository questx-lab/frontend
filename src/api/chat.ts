import StorageConst from '@/constants/storage.const'
import { Rsp } from '@/types'
import { ChannelType, ChatMessageType, UserChatStatusType, UserChatType } from '@/types/chat'

export const getChanelsApi = async (): Promise<Rsp<ChannelType[]>> => {
  // TODO: data mock
  const data: ChannelType[] = [
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
    {
      avatar: StorageConst.COMMUNITY_DEFAULT.src,
      name: '# 🎯 information',
      description: 'Channel’s short description. 👋👋👋',
    },
  ]

  const result: Rsp<ChannelType[]> = {
    code: 0,
    data,
  }

  return Promise.resolve(result)
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

export const getMessagesApi = async (): Promise<Rsp<ChatMessageType[]>> => {
  const data: ChatMessageType[] = [
    {
      id: '0',
      author: {
        id: '0',
        name: 'Marvin',
      },
      content: '😍😍😍 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '1',
      author: {
        id: '1',
        name: 'LinnLinn',
      },
      content:
        'Proin pulvinar a sapien ut congue. Donec vel eleifend velit, a ultrices lectus. Fusce sit amet lacus in erat blandit aliquam.',
    },
    {
      id: '2',
      author: {
        id: '0',
        name: 'Marvin',
      },
      content:
        'Ut in nibh sapien. Fusce posuere nec ipsum a volutpat. In at dictum est, at pulvinar mauris. Sed hendrerit nisl a tincidunt placerat. Suspendisse potenti.',
    },
    {
      id: '3',
      author: {
        id: '0',
        name: 'Marvin',
      },
      content:
        'Nulla fermentum metus vitae justo vehicula lobortis. Mauris a ex sit amet dolor bibendum finibus.',
    },
    {
      id: '4',
      author: {
        id: '14cbf1f5-2620-4a19-89ce-619b6d913c0a',
        name: 'CoolCat93',
      },
      content: '😍😍😍 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '5',
      author: {
        id: '4',
        name: 'CoolCat93',
      },
      content: '😍😍😍 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '6',
      author: {
        id: '4',
        name: 'CoolCat93',
      },
      content: '😍😍😍 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '7',
      author: {
        id: '14cbf1f5-2620-4a19-89ce-619b6d913c0a',
        name: 'CoolCat93',
      },
      content: '😍😍😍 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '8',
      author: {
        id: '3',
        name: 'LinnLinn',
      },
      content:
        'Proin pulvinar a sapien ut congue. Donec vel eleifend velit, a ultrices lectus. Fusce sit amet lacus in erat blandit aliquam.',
    },
    {
      id: '9',
      author: {
        id: '1',
        name: 'LinnLinn',
      },
      content:
        'Proin pulvinar a sapien ut congue. Donec vel eleifend velit, a ultrices lectus. Fusce sit amet lacus in erat blandit aliquam.',
    },
    {
      id: '10',
      author: {
        id: '1',
        name: 'LinnLinn',
      },
      content:
        'Proin pulvinar a sapien ut congue. Donec vel eleifend velit, a ultrices lectus. Fusce sit amet lacus in erat blandit aliquam.',
    },
    {
      id: '11',
      author: {
        id: '14cbf1f5-2620-4a19-89ce-619b6d913c0a',
        name: 'CoolCat93',
      },
      content: 'Hi',
    },
  ]
  const result: Rsp<ChatMessageType[]> = {
    code: 0,
    data,
  }

  return Promise.resolve(result)
}
