import { action, Action, createContextStore } from 'easy-peasy'

import { QuestType } from '@/types/project.type'

interface QuestSearchModel {
  listQuests: QuestType[]
  questsSelect: QuestType[]
  query: string
  listQuestQuery: QuestType[]

  onListQuestsChanged: Action<QuestSearchModel, QuestType[]>
  onQuestsSelectChanged: Action<QuestSearchModel, QuestType[]>
  onQueryChanged: Action<QuestSearchModel, string>
  onListQuestQueryChanged: Action<QuestSearchModel, QuestType[]>
}

export const NewQuestSearchStore = createContextStore<QuestSearchModel>({
  listQuests: [],
  questsSelect: [],
  query: '',
  listQuestQuery: [],

  onListQuestsChanged: action((state, quests) => {
    state.listQuests = quests
  }),

  onQuestsSelectChanged: action((state, quests) => {
    state.questsSelect = quests
  }),

  onQueryChanged: action((state, query) => {
    state.query = query
  }),

  onListQuestQueryChanged: action((state, queries) => {
    state.listQuestQuery = queries
  }),
})
