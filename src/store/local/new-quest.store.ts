import { action, Action, createContextStore } from 'easy-peasy'

import {
  QuestRecurrence,
  QuestRecurrencesStringMap,
  QuestTypeEnum,
  QuestTypeMap,
  TwitterEnum,
} from '@/constants/common.const'
import { CommunityType, QuestQuizType, QuestType } from '@/utils/type'
import { isTwitterType } from '@/types/twitter'

export interface NewQuestModel {
  title: string
  description: string
  type: QuestTypeEnum
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
  chooseQuestsHistory: any[]
  chooseQuestsPending: any[]

  quizzes: QuestQuizType[]
  project: CommunityType

  // Actions
  setQuest: Action<NewQuestModel, QuestType>

  setTitle: Action<NewQuestModel, string>
  setDescription: Action<NewQuestModel, string>
  setType: Action<NewQuestModel, QuestTypeEnum>
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
  setSpaceUrl: Action<NewQuestModel, string>
  setQuizzes: Action<NewQuestModel, QuestQuizType[]>
}

const NewQuestStore = createContextStore<NewQuestModel>({
  title: 'Untitled Quest',
  description: '',
  type: QuestTypeEnum.URL,
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
  spaceUrlTw: '',
  chooseQuestsHistory: [],
  chooseQuestsPending: [],
  quizzes: [
    {
      id: 0,
      question: '',
      answers: [],
      options: [],
    },
  ],
  project: { handle: '' },

  // Set all the fields for the state
  setQuest: action((state, quest) => {
    state.title = quest.title || ''
    state.description = quest.description || ''
    state.type = QuestTypeMap.get(quest.type || '') || QuestTypeEnum.URL
    state.textAutoValid = quest.validation_data.auto_validate || false
    state.recurrence = QuestRecurrencesStringMap.get(quest.recurrence || '') || QuestRecurrence.ONCE
    state.visitLink = quest.validation_data.link || ''
    state.telegramLink = quest.validation_data.link || ''
    state.discordLink = quest.validation_data.link || ''
    state.quizzes = quest.validation_data.quizzes || []

    // Twitter
    if (isTwitterType(state.type)) {
      switch (state.type) {
        case QuestTypeEnum.TWITTER_FOLLOW:
          state.accountUrl = quest.validation_data.twitter_handle || ''
          break
        case QuestTypeEnum.TWITTER_REACTION:
          if (
            quest.validation_data.like ||
            quest.validation_data.reply ||
            quest.validation_data.retweet
          ) {
            state.tweetUrl = quest.validation_data.tweet_url || ''
          }
          break
        case QuestTypeEnum.TWITTER_TWEET:
          state.contentTw = quest.validation_data.default_tweet || ''
          break
        case QuestTypeEnum.TWITTER_JOIN_SPACE:
          state.spaceUrlTw = quest.validation_data.space_url || ''
          break
      }
    }
  }),

  setTitle: action((state, newTitle) => {
    state.title = newTitle
  }),

  setDescription: action((state, newDescription) => {
    state.description = newDescription
  }),

  setType: action((state, newQuestType) => {
    state.type = newQuestType
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

  setSpaceUrl: action((state, spaceUrlTw) => {
    state.spaceUrlTw = spaceUrlTw
  }),

  setQuizzes: action((state, quizzes) => {
    state.quizzes = quizzes
  }),
})

export { NewQuestStore }
