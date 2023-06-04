import { action, Action, createContextStore, FilterActionTypes, StateMapper } from 'easy-peasy'

import {
  QuestRecurrence,
  QuestRecurrencesStringMap,
  QuestTypeEnum,
  QuestTypeMap,
  TwitterEnum,
} from '@/constants/common.const'
import { StateToModel } from '@/types/conversion'
import { isTwitterType } from '@/types/twitter'
import { QuestQuizType, QuestType, ReqNewQuestType, ValidationQuest } from '@/utils/type'

export interface NewQuestModel {
  title: string
  description: string
  type: QuestTypeEnum
  twitterType: string
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
  highlighted: boolean

  quizzes: QuestQuizType[]

  // Actions
  setQuest: Action<NewQuestModel, QuestType>

  setTitle: Action<NewQuestModel, string>
  setDescription: Action<NewQuestModel, string>
  setType: Action<NewQuestModel, QuestTypeEnum>
  setTwitterType: Action<NewQuestModel, string>
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
  setOptions: Action<NewQuestModel, { quizIndex: number; options: string[] }>
  setHighlighted: Action<NewQuestModel, boolean>
}

const NewQuestStore = createContextStore<NewQuestModel>({
  title: 'Untitled Quest',
  description: '',
  type: QuestTypeEnum.URL,
  twitterType: QuestTypeEnum.TWITTER,
  textAutoValid: false,
  recurrence: QuestRecurrence.ONCE,
  anwser: '',
  visitLink: '',
  telegramLink: '',
  discordLink: '',
  invites: 3,
  actionTwitter: [],
  accountUrl: '',
  tweetUrl: '',
  replyTw: '',
  contentTw: '',
  pointReward: 100,
  activeReward: 0,
  spaceUrlTw: '',
  quizzes: [
    {
      id: 0,
      question: '',
      answers: [],
      options: [],
    },
  ],
  highlighted: false,

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
    // If this is a quize, we need to initialize the quiz to empty
    if (newQuestType === QuestTypeEnum.QUIZ && state.quizzes.length === 0) {
      state.quizzes = [
        {
          id: 0,
          question: '',
          answers: [],
          options: [],
        },
      ]
    }
  }),

  setTwitterType: action((state, newTwitterType) => {
    state.twitterType = newTwitterType
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

  setOptions: action((state, { quizIndex, options }) => {
    state.quizzes[quizIndex].options = options
  }),

  setQuizzes: action((state, quizzes) => {
    state.quizzes = quizzes
  }),

  setHighlighted: action((state, highlighted) => {
    state.highlighted = highlighted
  }),
})

export const stateToNewQuestRequest = (
  state: StateMapper<FilterActionTypes<NewQuestModel>>,
  questId: string,
  community_handle: string,
  status: string
): StateToModel<ReqNewQuestType> => {
  if (!state.title) {
    return {
      error: 'Quest title cannot be empty.',
    }
  }

  let type = state.type
  const validations: ValidationQuest = {}

  switch (state.type) {
    case QuestTypeEnum.URL:
      break
    case QuestTypeEnum.IMAGE:
      break
    case QuestTypeEnum.TEXT:
      validations.auto_validate = state.textAutoValid
      validations.answer = state.anwser
      break
    case QuestTypeEnum.QUIZ:
      validations.quizzes = state.quizzes.map((e) => ({
        question: e.question,
        answers: e.answers,
        options: e.options,
      }))
      break
    case QuestTypeEnum.VISIT_LINK:
      validations.link = state.visitLink
      break
    case QuestTypeEnum.EMPTY:
      validations.auto_validate = state.textAutoValid
      break
    case QuestTypeEnum.TWITTER:
      validations.like = false
      validations.reply = false
      validations.retweet = false
      state.actionTwitter.forEach((e) => {
        switch (e) {
          case TwitterEnum.FOLLOW:
            validations.twitter_handle = state.accountUrl
            type = QuestTypeEnum.TWITTER_FOLLOW
            break
          case TwitterEnum.LIKE:
            validations.tweet_url = state.tweetUrl
            validations.like = true
            type = QuestTypeEnum.TWITTER_REACTION
            break
          case TwitterEnum.REPLY:
            validations.reply = true
            validations.tweet_url = state.tweetUrl
            type = QuestTypeEnum.TWITTER_REACTION

            break
          case TwitterEnum.RETWEET:
            validations.retweet = true
            validations.tweet_url = state.tweetUrl
            type = QuestTypeEnum.TWITTER_REACTION
            break
          case TwitterEnum.TWEET:
            validations.included_words = []
            validations.default_tweet = state.contentTw
            type = QuestTypeEnum.TWITTER_TWEET
            break
          case TwitterEnum.JOIN_SPACE:
            validations.space_url = state.spaceUrlTw
            type = QuestTypeEnum.TWITTER_JOIN_SPACE
            break
        }
      })

      break
    case QuestTypeEnum.DISCORD:
      validations.invite_link = state.discordLink
      break
    case QuestTypeEnum.JOIN_TELEGRAM:
      validations.invite_link = state.telegramLink
      break
    case QuestTypeEnum.INVITES:
      validations.number = state.invites
      break
  }

  const payload: ReqNewQuestType = {
    id: questId,
    community_handle: community_handle,
    type,
    title: state.title,
    description: state.description,
    categories: [],
    recurrence: state.recurrence,
    points: state.pointReward, // Other types of rewards are not supported for now
    validation_data: validations,
    condition_op: 'and',
    conditions: [],
    status,
    is_highlight: state.highlighted,
  }

  return {
    data: payload,
  }
}

export default NewQuestStore
