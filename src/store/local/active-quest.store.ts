import { action, Action, createContextStore } from 'easy-peasy'

import { QuestType } from '@/utils/type'

export interface ActiveQuestModel {
  quest: QuestType

  urlSubmit: string
  textSubmit: string
  replyUrlSubmit: string
  fileUpload: File[]
  visitLink: boolean
  quizAnswers: string[]

  setQuest: Action<ActiveQuestModel, QuestType>
  setUrlSubmit: Action<ActiveQuestModel, string>
  setTextSubmit: Action<ActiveQuestModel, string>
  setReplyUrlSubmit: Action<ActiveQuestModel, string>
  setFileUpload: Action<ActiveQuestModel, File[]>
  setVisitLink: Action<ActiveQuestModel, boolean>
  setQuizAnswers: Action<ActiveQuestModel, string[]>
}

export const ActiveQuestStore = createContextStore<ActiveQuestModel>({
  quest: {},
  urlSubmit: '',
  textSubmit: '',
  replyUrlSubmit: '',
  fileUpload: [],
  visitLink: false,
  quizAnswers: [],

  setQuest: action((state, quest) => {
    state.quest = quest
  }),

  setUrlSubmit: action((state, url) => {
    state.urlSubmit = url
  }),

  setTextSubmit: action((state, text) => {
    state.textSubmit = text
  }),

  setFileUpload: action((state, files) => {
    state.fileUpload = files
  }),

  setReplyUrlSubmit: action((state, url) => {
    state.replyUrlSubmit = url
  }),

  setVisitLink: action((state, visiLink) => {
    state.visitLink = visiLink
  }),

  setQuizAnswers: action((state, answers) => {
    state.quizAnswers = answers
  }),
})
