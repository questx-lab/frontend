import { action, Action, createContextStore } from 'easy-peasy'

import {
  ClaimedQuestStatus,
  QuestRecurrence,
  TabReviewEnum,
} from '@/constants/project.const'
import { ClaimQuestType } from '@/types/project.type'

interface ClaimReviewModel {
  pendingClaims: ClaimQuestType[]
  historyClaims: ClaimQuestType[]
  claimQuestActive: ClaimQuestType
  chooseQuestsHistory: ClaimQuestType[]
  chooseQuestsPending: ClaimQuestType[]
  reviewStatus: string
  allCheckHistory: boolean
  allCheckPending: boolean
  loadingModal: boolean
  submissionModal: boolean
  recurrence: QuestRecurrence
  tabReview: number

  setCheckHistory: Action<ClaimReviewModel, boolean>
  setCheckPending: Action<ClaimReviewModel, boolean>
  setClaimActive: Action<ClaimReviewModel, ClaimQuestType>
  setChooseHistory: Action<ClaimReviewModel, ClaimQuestType[]>
  setChoosePending: Action<ClaimReviewModel, ClaimQuestType[]>
  setReviewStatus: Action<ClaimReviewModel, string>
  setPendingClaims: Action<ClaimReviewModel, ClaimQuestType[]>
  setHistoryClaims: Action<ClaimReviewModel, ClaimQuestType[]>
  onLoadingModalChanged: Action<ClaimReviewModel, boolean>
  onSubmissionModalChanged: Action<ClaimReviewModel, boolean>
  setRecurrence: Action<ClaimReviewModel, QuestRecurrence>
  setTabReview: Action<ClaimReviewModel, number>
}

export const NewClaimReviewStore = createContextStore<ClaimReviewModel>({
  reviewStatus: ClaimedQuestStatus.ALL,
  chooseQuestsHistory: [],
  chooseQuestsPending: [],
  allCheckHistory: false,
  allCheckPending: false,
  pendingClaims: [],
  historyClaims: [],
  claimQuestActive: {},
  loadingModal: false,
  submissionModal: false,
  recurrence: QuestRecurrence.ONCE,
  tabReview: TabReviewEnum.PENDING,

  setReviewStatus: action((state, status) => {
    state.reviewStatus = status
  }),

  setChooseHistory: action((state, quests) => {
    state.chooseQuestsHistory = quests
  }),

  setChoosePending: action((state, quests) => {
    state.chooseQuestsPending = quests
  }),

  setCheckHistory: action((state, status) => {
    state.allCheckHistory = status
  }),

  setCheckPending: action((state, status) => {
    state.allCheckPending = status
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

  onLoadingModalChanged: action((state, loading) => {
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
