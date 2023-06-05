import { action, Action, createContextStore } from 'easy-peasy'

import { ClaimedQuestStatus, QuestRecurrence, TabReviewEnum } from '@/constants/common.const'
import { emptyQuest } from '@/types/quest'
import { ClaimQuestType } from '@/utils/type'

interface ClaimReviewModel {
  pendingClaims: ClaimQuestType[]
  historyClaims: ClaimQuestType[]
  claimQuestActive: ClaimQuestType
  selectedHistories: Map<string, ClaimQuestType>
  selectedPendings: Map<string, ClaimQuestType>
  reviewStatus: string
  allHistoryChecked: boolean
  allPendingChecked: boolean
  loadingModal: boolean
  showClaimDetails: boolean
  recurrence: QuestRecurrence
  selectedTab: number

  setCheckAllHistory: Action<ClaimReviewModel, boolean>
  setCheckAllPending: Action<ClaimReviewModel, boolean>
  setClaimActive: Action<ClaimReviewModel, ClaimQuestType>
  setSelectedHistory: Action<ClaimReviewModel, Map<string, ClaimQuestType>>
  setSelectedPending: Action<ClaimReviewModel, Map<string, ClaimQuestType>>
  setReviewStatus: Action<ClaimReviewModel, string>
  setPendingClaims: Action<ClaimReviewModel, ClaimQuestType[]>
  setHistoryClaims: Action<ClaimReviewModel, ClaimQuestType[]>
  setLoading: Action<ClaimReviewModel, boolean>
  setShowClaimDetails: Action<ClaimReviewModel, boolean>
  setRecurrence: Action<ClaimReviewModel, QuestRecurrence>
  setSelectedTab: Action<ClaimReviewModel, number>
}

const ClaimReviewStore = createContextStore<ClaimReviewModel>({
  reviewStatus: ClaimedQuestStatus.ALL,
  selectedHistories: new Map(),
  selectedPendings: new Map(),
  allHistoryChecked: false,
  allPendingChecked: false,
  pendingClaims: [],
  historyClaims: [],
  claimQuestActive: { id: '', user: {}, quest: emptyQuest() },
  loadingModal: false,
  showClaimDetails: false,
  recurrence: QuestRecurrence.ONCE,
  selectedTab: TabReviewEnum.PENDING,

  setReviewStatus: action((state, status) => {
    state.reviewStatus = status
  }),

  setSelectedHistory: action((state, claimMap) => {
    state.selectedHistories = new Map(claimMap)
  }),

  setSelectedPending: action((state, claimMap) => {
    state.selectedPendings = new Map(claimMap)
  }),

  setCheckAllHistory: action((state, status) => {
    state.allHistoryChecked = status
  }),

  setCheckAllPending: action((state, status) => {
    state.allPendingChecked = status
  }),
  setPendingClaims: action((state, claims) => {
    state.pendingClaims = claims
  }),

  setHistoryClaims: action((state, claims) => {
    state.historyClaims = claims
  }),

  setClaimActive: action((state, claim) => {
    state.claimQuestActive = claim
  }),

  setLoading: action((state, loading) => {
    state.loadingModal = loading
  }),

  setShowClaimDetails: action((state, modal) => {
    state.showClaimDetails = modal
  }),

  setRecurrence: action((state, newRecurrence) => {
    state.recurrence = newRecurrence
  }),

  setSelectedTab: action((state, tab) => {
    state.selectedTab = tab
  }),
})

export default ClaimReviewStore
