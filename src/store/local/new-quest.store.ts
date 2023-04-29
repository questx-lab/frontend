import { action, Action, createContextStore } from 'easy-peasy'

import { QuestRecurrence, QuestTypeEnum } from '@/constants/project.const'

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

  // Actions
  onTitleChanged: Action<NewQuestModel, string>
  onDescriptionChanged: Action<NewQuestModel, string>
  onQuestTypeChanged: Action<NewQuestModel, QuestTypeEnum>
  onTextAutoValid: Action<NewQuestModel, boolean>
  onRecurrenceChanged: Action<NewQuestModel, QuestRecurrence>
  onAnswerChanged: Action<NewQuestModel, string>
  onVisitLinkChanged: Action<NewQuestModel, string>
  onTelegramLinkChanged: Action<NewQuestModel, string>
  onInvitesChanged: Action<NewQuestModel, number>
  onActionTwitterChanged: Action<NewQuestModel, string[]>
  onAccountLinkChanged: Action<NewQuestModel, string>
  onTweetUrlChanged: Action<NewQuestModel, string>
  onReplyTwChanged: Action<NewQuestModel, string>
  onContentTwChanged: Action<NewQuestModel, string>
  onPointRewardChanged: Action<NewQuestModel, number>
  onActiveRewardChanged: Action<NewQuestModel, number>
  onTwitterTypeChanged: Action<NewQuestModel, string>
  onSpaceUrlTwChanged: Action<NewQuestModel, string>
  onOpenModalChanged: Action<NewQuestModel, boolean>
}

const NewQuestStore = createContextStore<NewQuestModel>({
  title: '',
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

  onTitleChanged: action((state, newTitle) => {
    state.title = newTitle
  }),

  onDescriptionChanged: action((state, newDescription) => {
    state.description = newDescription
  }),

  onQuestTypeChanged: action((state, newQuestType) => {
    state.questType = newQuestType
  }),

  onTextAutoValid: action((state, newTextAutoValid) => {
    state.textAutoValid = newTextAutoValid
  }),

  onRecurrenceChanged: action((state, newRecurrence) => {
    state.recurrence = newRecurrence
  }),

  onAnswerChanged: action((state, newAnwser) => {
    state.anwser = newAnwser
  }),

  onVisitLinkChanged: action((state, newVisitLink) => {
    state.visitLink = newVisitLink
  }),

  onTelegramLinkChanged: action((state, newTelegramLink) => {
    state.telegramLink = newTelegramLink
  }),

  onInvitesChanged: action((state, newInvites) => {
    state.invites = newInvites
  }),

  onActionTwitterChanged: action((state, actionTwitters) => {
    state.actionTwitter = actionTwitters
  }),

  onAccountLinkChanged: action((state, newAccountUrl) => {
    state.accountUrl = newAccountUrl
  }),

  onTweetUrlChanged: action((state, newTweetUrl) => {
    state.tweetUrl = newTweetUrl
  }),

  onReplyTwChanged: action((state, newReplyTw) => {
    state.replyTw = newReplyTw
  }),

  onContentTwChanged: action((state, newContentTw) => {
    state.contentTw = newContentTw
  }),

  onPointRewardChanged: action((state, newPointReward) => {
    state.pointReward = newPointReward
  }),

  onActiveRewardChanged: action((state, newActiveReward) => {
    state.activeReward = newActiveReward
  }),

  onTwitterTypeChanged: action((state, newTwitterType) => {
    state.twitterType = newTwitterType
  }),

  onSpaceUrlTwChanged: action((state, spaceUrlTw) => {
    state.spaceUrlTw = spaceUrlTw
  }),

  onOpenModalChanged: action((state, openModal) => {
    state.isOpenModal = openModal
  }),
})

export { NewQuestStore }
