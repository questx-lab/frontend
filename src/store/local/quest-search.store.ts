import { action, Action, createContextStore } from 'easy-peasy'

import { QuestType } from '@/utils/type'

interface QuestSearchModel {
  quests: QuestType[]
  questsSelect: QuestType[]
  query: string
  questsQuery: QuestType[]

  setQuests: Action<QuestSearchModel, QuestType[]>
  setQuestsSelect: Action<QuestSearchModel, QuestType[]>
  setQuery: Action<QuestSearchModel, string>
  setQuestsQuery: Action<QuestSearchModel, QuestType[]>
}

export const NewQuestSearchStore = createContextStore<QuestSearchModel>({
  quests: [],
  questsSelect: [],
  query: '',
  questsQuery: [],

  setQuests: action((state, quests) => {
    state.quests = quests
  }),

  setQuestsSelect: action((state, quests) => {
    state.questsSelect = quests
  }),

  setQuery: action((state, query) => {
    state.query = query
  }),

  setQuestsQuery: action((state, queries) => {
    state.questsQuery = queries
  }),
})
