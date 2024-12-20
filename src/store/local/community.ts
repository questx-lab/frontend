import { action, Action, createContextStore } from 'easy-peasy'

import { CommunityRoleEnum, NFTsTab } from '@/constants/common.const'
import { CategoryType } from '@/types'
import {
  CommunityIndexMode,
  CommunityType,
  ControlPanelTab,
  emptyCommunity,
} from '@/types/community'
import { LotteryEventType } from '@/types/lottery'
import { QuestType } from '@/types/quest'

interface CommunityModel {
  selectedCommunity: CommunityType
  query: string
  quests: QuestType[]
  searchProjects: CommunityType[]
  role: CommunityRoleEnum
  canEdit: boolean
  categories: CategoryType[]
  invitedBy: string
  activeControlPanelTab: number
  communityIndexMode: number
  lotteryEvent: LotteryEventType | undefined
  showUnfollowConfirmation: boolean
  selectedAccount: string
  walletAddress: string
  depositAmount: number
  switchedChain: boolean
  nftTab: NFTsTab
  nftImage: File | undefined

  setSelectedCommunity: Action<CommunityModel, CommunityType>
  setQuery: Action<CommunityModel, string>
  setSearchProjects: Action<CommunityModel, CommunityType[]>
  setRole: Action<CommunityModel, CommunityRoleEnum>
  setCategories: Action<CommunityModel, CategoryType[]>
  setInviteBy: Action<CommunityModel, string>
  setActiveControlPanelTab: Action<CommunityModel, number>
  setCommunityIndexMode: Action<CommunityModel, number>
  setQuests: Action<CommunityModel, QuestType[]>
  setLotteryEvent: Action<CommunityModel, LotteryEventType | undefined>
  setShowUnfollowConfirmation: Action<CommunityModel, boolean>
  setSelectedAccount: Action<CommunityModel, string>
  setWalletAddress: Action<CommunityModel, string>
  setDepositAmount: Action<CommunityModel, number>
  setSwitchedChain: Action<CommunityModel, boolean>
  setNftTab: Action<CommunityModel, NFTsTab>
  setNftImage: Action<CommunityModel, File | undefined>
}

const CommunityStore = createContextStore<CommunityModel>({
  selectedCommunity: emptyCommunity(),
  query: '',
  searchProjects: [],
  role: CommunityRoleEnum.NOT_LOGIN,
  canEdit: false, // can edit community, add/edit quests.
  categories: [],
  invitedBy: '',
  quests: [],
  activeControlPanelTab: ControlPanelTab.QUESTS,
  communityIndexMode: CommunityIndexMode.VIEW_COMMUNITY,
  lotteryEvent: undefined,
  showUnfollowConfirmation: false,
  selectedAccount: '',
  walletAddress: '',
  depositAmount: 0,
  switchedChain: false,
  nftTab: NFTsTab.ListNFT,
  nftImage: undefined,

  setSelectedCommunity: action((state, newProject) => {
    state.selectedCommunity = newProject
  }),
  setQuery: action((state, query) => {
    state.query = query
  }),
  setSearchProjects: action((state, projects) => {
    state.searchProjects = projects
  }),
  setRole: action((state, role) => {
    state.role = role
    if (role === CommunityRoleEnum.OWNER || role === CommunityRoleEnum.EDITOR) {
      state.canEdit = true
    } else {
      state.canEdit = false
    }
  }),
  setCategories: action((state, categories) => {
    state.categories = categories
  }),
  setInviteBy: action((state, invitedBy) => {
    state.invitedBy = invitedBy
  }),
  setActiveControlPanelTab: action((state, activeControlPanelTab) => {
    state.activeControlPanelTab = activeControlPanelTab
  }),
  setCommunityIndexMode: action((state, communityIndexMode) => {
    state.communityIndexMode = communityIndexMode
  }),
  setQuests: action((state, quests) => {
    state.quests = quests
  }),
  setLotteryEvent: action((state, event) => {
    state.lotteryEvent = event
  }),
  setShowUnfollowConfirmation: action((state, showUnfollowConfirmation) => {
    state.showUnfollowConfirmation = showUnfollowConfirmation
  }),
  setSelectedAccount: action((state, selectedAccount) => {
    state.selectedAccount = selectedAccount
  }),
  setWalletAddress: action((state, walletAddress) => {
    state.walletAddress = walletAddress
  }),
  setDepositAmount: action((state, depositAmount) => {
    state.depositAmount = depositAmount
  }),
  setSwitchedChain: action((state, switchedChain) => {
    state.switchedChain = switchedChain
  }),
  setNftTab: action((state, nftTab) => {
    state.nftTab = nftTab
  }),
  setNftImage: action((state, nftImage) => {
    state.nftImage = nftImage
  }),
})
export default CommunityStore
