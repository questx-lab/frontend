import { action, Action, createContextStore } from 'easy-peasy'

import { ChannelType, emptyChannel, TabChatType } from '@/types/chat'

interface ChatModel {
  showChatPopover: boolean
  selectedTab: TabChatType
  selectedChannel: ChannelType

  setTab: Action<ChatModel, TabChatType>
  setChannel: Action<ChatModel, ChannelType>
  setShowChatPopover: Action<ChatModel, boolean>
}

const ChatStore = createContextStore<ChatModel>({
  showChatPopover: false,
  selectedTab: TabChatType.Chat,
  selectedChannel: emptyChannel(),

  setTab: action((state, newTab) => {
    state.selectedTab = newTab
  }),

  setChannel: action((state, newChannel) => {
    state.selectedChannel = newChannel
  }),

  setShowChatPopover: action((state, visibility) => {
    state.showChatPopover = visibility
  }),
})

export default ChatStore
