import { action, Action, createContextStore } from 'easy-peasy'

import { ClaimedQuestStatus, QuestRecurrence, TabReviewEnum } from '@/constants/common.const'
import { ClaimQuestType } from '@/utils/type'

interface ClaimReviewModel {
  pendingClaims: ClaimQuestType[]
  historyClaims: ClaimQuestType[]
  claimQuestActive: ClaimQuestType
  chooseQuestsHistory: ClaimQuestType[]
  chooseQuestsPending: ClaimQuestType[]
  reviewStatus: string
  allHistoryChecked: boolean
  allPendingChecked: boolean
  loadingModal: boolean
  submissionModal: boolean
  recurrence: QuestRecurrence
  tabReview: number

  setCheckAllHistory: Action<ClaimReviewModel, boolean>
  setCheckAllPending: Action<ClaimReviewModel, boolean>
  setClaimActive: Action<ClaimReviewModel, ClaimQuestType>
  setSelectedHistory: Action<ClaimReviewModel, ClaimQuestType[]>
  setSelectedPending: Action<ClaimReviewModel, ClaimQuestType[]>
  setReviewStatus: Action<ClaimReviewModel, string>
  setPendingClaims: Action<ClaimReviewModel, ClaimQuestType[]>
  setHistoryClaims: Action<ClaimReviewModel, ClaimQuestType[]>
  setLoading: Action<ClaimReviewModel, boolean>
  onSubmissionModalChanged: Action<ClaimReviewModel, boolean>
  setRecurrence: Action<ClaimReviewModel, QuestRecurrence>
  setTabReview: Action<ClaimReviewModel, number>
}

export const NewClaimReviewStore = createContextStore<ClaimReviewModel>({
  reviewStatus: ClaimedQuestStatus.ALL,
  chooseQuestsHistory: [],
  chooseQuestsPending: [],
  allHistoryChecked: false,
  allPendingChecked: false,
  pendingClaims: [],
  historyClaims: [],
  claimQuestActive: { user: {} },
  loadingModal: false,
  submissionModal: false,
  recurrence: QuestRecurrence.ONCE,
  tabReview: TabReviewEnum.PENDING,

  setReviewStatus: action((state, status) => {
    state.reviewStatus = status
  }),

  setSelectedHistory: action((state, quests) => {
    state.chooseQuestsHistory = quests
  }),

  setSelectedPending: action((state, quests) => {
    state.chooseQuestsPending = quests
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

  onSubmissionModalChanged: action((state, modal) => {
    state.submissionModal = modal
  }),

  setRecurrence: action((state, newRecurrence) => {
    state.recurrence = newRecurrence
  }),

  setTabReview: action((state, tab) => {
    state.tabReview = tab
  }),
})
