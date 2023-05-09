import { action, Action, createContextStore } from 'easy-peasy'

import { QuestRecurrence, QuestTypeEnum } from '@/constants/project.const'
import { QuestType } from '@/types/project.type'

export interface NewQuestModel {
  title: string
  description: string
  questType: QuestTypeEnum
  textAutoValid: boolean
  recurrence: QuestRecurrence
  anwser: string
  visitLink: string
  telegramLink: string
  invites: number
  actionTwitter: string[]
  accountUrl: string
  tweetUrl: string
  replyTw: string
  contentTw: string
  spaceUrlTw: string
  pointReward: number
  activeReward: number
  twitterType: string
  isOpenModal: boolean
  chooseQuestsHistory: any[]
  chooseQuestsPending: any[]

  questDetailModal: boolean
  allCheckHistory: boolean
  allCheckPending: boolean
  loadingModal: boolean

  questActive: QuestType
  quizQuestion: string
  quizAnswers: string[]
  quizCorrectAnswers: string[]

  // Actions
  setTitle: Action<NewQuestModel, string>
  setDescription: Action<NewQuestModel, string>
  setQuestType: Action<NewQuestModel, QuestTypeEnum>
  setTextAutoValidation: Action<NewQuestModel, boolean>
  setRecurrence: Action<NewQuestModel, QuestRecurrence>
  setAnswer: Action<NewQuestModel, string>
  setVisitLink: Action<NewQuestModel, string>
  setTelegramLink: Action<NewQuestModel, string>
  setInvites: Action<NewQuestModel, number>
  setActionTwitter: Action<NewQuestModel, string[]>
  setAccountLink: Action<NewQuestModel, string>
  setTweetUrl: Action<NewQuestModel, string>
  setReplyTwitter: Action<NewQuestModel, string>
  setContentTwitter: Action<NewQuestModel, string>
  setPointReward: Action<NewQuestModel, number>
  setActiveReward: Action<NewQuestModel, number>
  setTwitterType: Action<NewQuestModel, string>
  setSpaceUrl: Action<NewQuestModel, string>
  onOpenModalChanged: Action<NewQuestModel, boolean>

  onQuestDetailModalChanged: Action<NewQuestModel, boolean>
  onAllCheckHistoryChanged: Action<NewQuestModel, boolean>
  onLoadingModalChanged: Action<NewQuestModel, boolean>

  setQuestActive: Action<NewQuestModel, QuestType>
  setQuizQuestion: Action<NewQuestModel, string>
  setQuizAnswers: Action<NewQuestModel, string[]>
  setQuizCorrectAnswers: Action<NewQuestModel, string[]>
}

const NewQuestStore = createContextStore<NewQuestModel>({
  title: 'Untitled Quest',
  description: '',
  questType: QuestTypeEnum.URL,
  textAutoValid: false,
  recurrence: QuestRecurrence.ONCE,
  anwser: '',
  visitLink: '',
  telegramLink: '',
  invites: 10,
  actionTwitter: [],
  accountUrl: '',
  tweetUrl: '',
  replyTw: '',
  contentTw: '',
  pointReward: 100,
  activeReward: 0,
  twitterType: '',
  spaceUrlTw: '',
  isOpenModal: false,
  // reviewStatus: ReviewStatusEnum.SUCCESS,
  chooseQuestsHistory: [],
  chooseQuestsPending: [],
  questDetailModal: false,
  loadingModal: false,
  questActive: {},
  quizQuestion: '',
  quizAnswers: [''],
  quizCorrectAnswers: [],

  allCheckHistory: false,
  allCheckPending: false,

  setTitle: action((state, newTitle) => {
    state.title = newTitle
  }),

  setDescription: action((state, newDescription) => {
    state.description = newDescription
  }),

  setQuestType: action((state, newQuestType) => {
    state.questType = newQuestType
  }),

  setTextAutoValidation: action((state, newTextAutoValid) => {
    state.textAutoValid = newTextAutoValid
  }),

  setRecurrence: action((state, newRecurrence) => {
    state.recurrence = newRecurrence
  }),

  setAnswer: action((state, newAnwser) => {
    state.anwser = newAnwser
  }),

  setVisitLink: action((state, newVisitLink) => {
    state.visitLink = newVisitLink
  }),

  setTelegramLink: action((state, newTelegramLink) => {
    state.telegramLink = newTelegramLink
  }),

  setInvites: action((state, newInvites) => {
    state.invites = newInvites
  }),

  setActionTwitter: action((state, actionTwitters) => {
    state.actionTwitter = actionTwitters
  }),

  setAccountLink: action((state, newAccountUrl) => {
    state.accountUrl = newAccountUrl
  }),

  setTweetUrl: action((state, newTweetUrl) => {
    state.tweetUrl = newTweetUrl
  }),

  setReplyTwitter: action((state, newReplyTw) => {
    state.replyTw = newReplyTw
  }),

  setContentTwitter: action((state, newContentTw) => {
    state.contentTw = newContentTw
  }),

  setPointReward: action((state, newPointReward) => {
    state.pointReward = newPointReward
  }),

  setActiveReward: action((state, newActiveReward) => {
    state.activeReward = newActiveReward
  }),

  setTwitterType: action((state, newTwitterType) => {
    state.twitterType = newTwitterType
  }),

  setSpaceUrl: action((state, spaceUrlTw) => {
    state.spaceUrlTw = spaceUrlTw
  }),

  onOpenModalChanged: action((state, openModal) => {
    state.isOpenModal = openModal
  }),

  onQuestDetailModalChanged: action((state, modal) => {
    state.questDetailModal = modal
  }),

  onAllCheckHistoryChanged: action((state, status) => {
    state.allCheckHistory = status
  }),

  onLoadingModalChanged: action((state, loading) => {
    state.loadingModal = loading
  }),

  setQuestActive: action((state, quest) => {
    state.questActive = quest
  }),

  setQuizQuestion: action((state, question) => {
    state.quizQuestion = question
  }),

  setQuizAnswers: action((state, questions) => {
    state.quizAnswers = questions
  }),

  setQuizCorrectAnswers: action((state, questions) => {
    state.quizCorrectAnswers = questions
  }),
})

export { NewQuestStore }
