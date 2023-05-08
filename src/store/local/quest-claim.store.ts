import { action, Action, createContextStore } from 'easy-peasy'

import { ClaimedQuestStatus, QuestRecurrence } from '@/constants/project.const'
import { ClaimQuestType, QuestType } from '@/types/project.type'

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
  questActive: QuestType
  submissionModal: boolean
  recurrence: QuestRecurrence

  onAllCheckHistoryChanged: Action<QuestClaimModel, boolean>
  onAllCheckPendingChanged: Action<QuestClaimModel, boolean>
  onClaimQuestActiveChanged: Action<QuestClaimModel, ClaimQuestType>
  onChooseQuestsHistoryChanged: Action<QuestClaimModel, ClaimQuestType[]>
  onChooseQuestsPendingChanged: Action<QuestClaimModel, ClaimQuestType[]>
  onReviewStatusChanged: Action<QuestClaimModel, string>
  onPendingClaimsChanged: Action<QuestClaimModel, ClaimQuestType[]>
  onHistoryClaimsChanged: Action<QuestClaimModel, ClaimQuestType[]>
  onLoadingModalChanged: Action<QuestClaimModel, boolean>
  onQuestActiveChanged: Action<QuestClaimModel, QuestType>
  onSubmissionModalChanged: Action<QuestClaimModel, boolean>
  onRecurrenceChanged: Action<QuestClaimModel, QuestRecurrence>
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
  questActive: {},
  submissionModal: false,
  recurrence: QuestRecurrence.ONCE,

  onReviewStatusChanged: action((state, status) => {
    state.reviewStatus = status
  }),

  onChooseQuestsHistoryChanged: action((state, quests) => {
    state.chooseQuestsHistory = quests
  }),

  onChooseQuestsPendingChanged: action((state, quests) => {
    state.chooseQuestsPending = quests
  }),

  onAllCheckHistoryChanged: action((state, status) => {
    state.allCheckHistory = status
  }),

  onAllCheckPendingChanged: action((state, status) => {
    state.allCheckPending = status
  }),
  onPendingClaimsChanged: action((state, claims) => {
    state.pendingClaims = claims
  }),

  onHistoryClaimsChanged: action((state, claims) => {
    state.historyClaims = claims
  }),

  onClaimQuestActiveChanged: action((state, claim) => {
    state.claimQuestActive = claim
  }),

  onLoadingModalChanged: action((state, loading) => {
    state.loadingModal = loading
  }),

  onQuestActiveChanged: action((state, quest) => {
    state.questActive = quest
  }),

  onSubmissionModalChanged: action((state, modal) => {
    state.submissionModal = modal
  }),

  onRecurrenceChanged: action((state, newRecurrence) => {
    state.recurrence = newRecurrence
  }),
})
