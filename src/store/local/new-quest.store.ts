import { action, Action, createContextStore } from 'easy-peasy'

import { QuestRecurrence, QuestTypeEnum } from '@/constants/common.const'
import { CommunityType, QuestQuizType, QuestType } from '@/utils/type'

export interface NewQuestModel {
  title: string
  description: string
  questType: QuestTypeEnum
  textAutoValid: boolean
  recurrence: QuestRecurrence
  anwser: string
  visitLink: string
  telegramLink: string
  discordLink: string
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
  chooseQuestsHistory: any[]
  chooseQuestsPending: any[]

  questActive: QuestType
  quizzes: QuestQuizType[]
  project: CommunityType

  // Actions
  setTitle: Action<NewQuestModel, string>
  setDescription: Action<NewQuestModel, string>
  setQuestType: Action<NewQuestModel, QuestTypeEnum>
  setTextAutoValidation: Action<NewQuestModel, boolean>
  setRecurrence: Action<NewQuestModel, QuestRecurrence>
  setAnswer: Action<NewQuestModel, string>
  setVisitLink: Action<NewQuestModel, string>
  setTelegramLink: Action<NewQuestModel, string>
  setDiscordLink: Action<NewQuestModel, string>
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

  setQuestActive: Action<NewQuestModel, QuestType>
  setQuizzes: Action<NewQuestModel, QuestQuizType[]>
  setProject: Action<NewQuestModel, CommunityType>
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
  discordLink: '',
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
  chooseQuestsHistory: [],
  chooseQuestsPending: [],
  questActive: {},
  quizzes: [
    {
      id: 0,
      question: '',
      answers: [],
      options: [],
    },
  ],
  project: { handle: '' },

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

  setDiscordLink: action((state, newDiscordLink) => {
    state.discordLink = newDiscordLink
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

  setQuestActive: action((state, quest) => {
    state.questActive = quest
  }),

  setQuizzes: action((state, quizzes) => {
    state.quizzes = quizzes
  }),

  setProject: action((state, newProject) => {
    state.project = newProject
  }),
})

export { NewQuestStore }
