import { useEffect, useState } from 'react'

import chatController from '@/modules/chat/services/chat-controller'
import { ChannelType } from '@/types/chat'

export default function useChannels(communityHandle: string) {
  const [channels, setChannels] = useState<ChannelType[]>(
    chatController.getChannels(communityHandle)
  )

  useEffect(() => {
    const listener = {
      onChannelsChanged: (handle: string, newChannels: ChannelType[]) => {
        if (communityHandle === handle) {
          setChannels(newChannels)
        }
      },
    }

    if (communityHandle !== '') {
      chatController.addChannelsListener(listener)
    }

    return () => {
      if (communityHandle !== '') {
        chatController.removeChannelsListener(listener)
      }
    }
  }, [communityHandle])

  return channels
}
