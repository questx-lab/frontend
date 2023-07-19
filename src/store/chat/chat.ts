import { action, Action, createContextStore } from 'easy-peasy'

import { ChannelType, emptyChannel } from '@/types/chat'
import { CommunityType, emptyCommunity } from '@/types/community'

interface ChatModel {
  community: CommunityType
  channels: ChannelType[]
  currentChannel: ChannelType

  setCommunity: Action<ChatModel, CommunityType>
  setChannels: Action<ChatModel, ChannelType[]>
}

const ChatStore = createContextStore<ChatModel>({
  community: emptyCommunity(),
  channels: [],
  currentChannel: emptyChannel(),

  setCommunity: action((state, community) => {
    state.community = community
  }),

  setChannels: action((state, channels) => {
    state.channels = channels
    if (channels.length > 0 && state.currentChannel.id === BigInt(0)) {
      state.currentChannel = channels[0]
    }
  }),
})

export default ChatStore
