import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityType, emptyCommunity } from '@/types/community'
import { RoomDataType } from '@/types/townhall'

export enum ActiveSidebarTab {
  NONE,
  EMOJI,
  CHAT,
  LUCKY_BOX_SETTING,
  EXIT,
}

export const ActiveSidebarTabStringMap = new Map<ActiveSidebarTab, String>([
  [ActiveSidebarTab.NONE, ''],
  [ActiveSidebarTab.EMOJI, 'Emoji'],
  [ActiveSidebarTab.CHAT, 'Chat'],
  [ActiveSidebarTab.LUCKY_BOX_SETTING, 'Lucky Box Setting'],
  [ActiveSidebarTab.EXIT, 'Exit'],
])

interface RoomModel {
  community: CommunityType
  gameRooms: RoomDataType[]
  activeTab: ActiveSidebarTab
  showCharacterSelectModal: boolean

  setCommunity: Action<RoomModel, CommunityType>
  setGameRooms: Action<RoomModel, RoomDataType[]>
  toggleTab: Action<RoomModel, ActiveSidebarTab>
  setShowCharacterSelectModal: Action<RoomModel, boolean>
}

const RoomStore = createContextStore<RoomModel>({
  community: emptyCommunity(),
  gameRooms: [],
  activeTab: ActiveSidebarTab.NONE,
  showCharacterSelectModal: false,

  setCommunity: action((state, newProject) => {
    state.community = newProject
  }),

  setGameRooms: action((state, rooms) => {
    state.gameRooms = rooms
  }),

  toggleTab: action((state, newTab) => {
    if (state.activeTab === newTab) {
      state.activeTab = ActiveSidebarTab.NONE
    } else {
      state.activeTab = newTab
    }
  }),

  setShowCharacterSelectModal: action((state, showCharacterSelectModal) => {
    state.showCharacterSelectModal = showCharacterSelectModal
  }),
})

export default RoomStore
