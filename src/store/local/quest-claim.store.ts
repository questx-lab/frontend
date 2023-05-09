import { action, Action, createContextStore } from 'easy-peasy'

import {
  ClaimedQuestStatus,
  QuestRecurrence,
  TabReviewEnum,
} from '@/constants/project.const'
import { ClaimQuestType } from '@/types/project.type'

interface QuestClaimModel {
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

  setCheckHistory: Action<QuestClaimModel, boolean>
  setCheckPending: Action<QuestClaimModel, boolean>
  setClaimActive: Action<QuestClaimModel, ClaimQuestType>
  setChooseHistory: Action<QuestClaimModel, ClaimQuestType[]>
  setChoosePending: Action<QuestClaimModel, ClaimQuestType[]>
  setReviewStatus: Action<QuestClaimModel, string>
  setPendingClaims: Action<QuestClaimModel, ClaimQuestType[]>
  setHistoryClaims: Action<QuestClaimModel, ClaimQuestType[]>
  onLoadingModalChanged: Action<QuestClaimModel, boolean>
  onSubmissionModalChanged: Action<QuestClaimModel, boolean>
  setRecurrence: Action<QuestClaimModel, QuestRecurrence>
  setTabReview: Action<QuestClaimModel, number>
}

export const NewQuestClaimStore = createContextStore<QuestClaimModel>({
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
