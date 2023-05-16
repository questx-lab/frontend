import { action, Action, createContextStore } from 'easy-peasy'

import { ProjectRoleEnum } from '@/constants/project.const'
import { QuestType } from '@/types/project.type'

export interface ActiveQuestModel {
  quest: QuestType

  urlSubmit: string
  textSubmit: string
  replyUrlSubmit: string
  fileUpload: File[]

  setQuest: Action<ActiveQuestModel, QuestType>
  setUrlSubmit: Action<ActiveQuestModel, string>
  setTextSubmit: Action<ActiveQuestModel, string>
  setReplyUrlSubmit: Action<ActiveQuestModel, string>
  setFileUpload: Action<ActiveQuestModel, File[]>
}

export const ActiveQuestStore = createContextStore<ActiveQuestModel>({
  quest: {},
  urlSubmit: '',
  textSubmit: '',
  replyUrlSubmit: '',
  fileUpload: [],

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
})
