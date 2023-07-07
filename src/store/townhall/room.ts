import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityType, emptyCommunity } from '@/types/community'
import { RoomDataType } from '@/types/townhall'
import { CharacterType } from '@/types'

export enum ActiveSidebarTab {
  NONE,
  EMOJI,
  CHAT,
  LUCKY_BOX_SETTING,
}

interface RoomModel {
  community: CommunityType
  gameRooms: RoomDataType[]
  activeTab: ActiveSidebarTab
  showCharacterSelectModal: boolean
  selectedCharacter: CharacterType | undefined
  currentCharacter: CharacterType | undefined

  setCommunity: Action<RoomModel, CommunityType>
  setGameRooms: Action<RoomModel, RoomDataType[]>
  toggleTab: Action<RoomModel, ActiveSidebarTab>
  setShowCharacterSelectModal: Action<RoomModel, boolean>
  setSelectedCharacter: Action<RoomModel, CharacterType | undefined>
  setCurrentCharacter: Action<RoomModel, CharacterType | undefined>
}

const RoomStore = createContextStore<RoomModel>({
  community: emptyCommunity(),
  gameRooms: [],
  activeTab: ActiveSidebarTab.NONE,
  showCharacterSelectModal: false,
  selectedCharacter: undefined,
  currentCharacter: undefined,

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

  setSelectedCharacter: action((state, selectedCharacter) => {
    state.selectedCharacter = selectedCharacter
  }),

  setCurrentCharacter: action((state, currentCharacter) => {
    state.currentCharacter = currentCharacter
  }),
})

export default RoomStore
