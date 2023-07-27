import { action, Action, createContextStore } from 'easy-peasy'

import { ChannelType } from '@/types/chat'

interface ChannelSettingModel {
  showModal: boolean
  channels: ChannelType[]
  name: string
  description: string

  setChannels: Action<ChannelSettingModel, ChannelType[]>
  setShowModal: Action<ChannelSettingModel, boolean>
  setName: Action<ChannelSettingModel, string>
  setDescription: Action<ChannelSettingModel, string>
}

const ChannelSettingStore = createContextStore<ChannelSettingModel>({
  channels: [],
  showModal: false,
  name: '',
  description: '',

  setChannels: action((state, channels) => {
    state.channels = channels
  }),

  setShowModal: action((state, modal) => {
    state.showModal = modal
  }),

  setName: action((state, name) => {
    state.name = name
  }),

  setDescription: action((state, description) => {
    state.description = description
  }),
})

export default ChannelSettingStore
