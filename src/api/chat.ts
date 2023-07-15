import StorageConst from '@/constants/storage.const'
import { Rsp } from '@/types'
import { ChannelType } from '@/types/chat'

export const getChanelsApi = async (): Promise<Rsp<ChannelType[]>> => {
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
  ]

  const result: Rsp<ChannelType[]> = {
    code: 0,
    data,
  }

  return Promise.resolve(result)
}
