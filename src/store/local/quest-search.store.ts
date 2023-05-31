import { action, Action, createContextStore } from 'easy-peasy'

import { QuestType } from '@/utils/type'

interface QuestSearchModel {
  quests: QuestType[]
  filteredQuests: QuestType[]
  selectedQuest: QuestType[]

  setQuests: Action<QuestSearchModel, QuestType[]>
  setFilteredQuests: Action<QuestSearchModel, QuestType[]>
  setSelectedQuests: Action<QuestSearchModel, QuestType[]>
}

export const NewQuestSearchStore = createContextStore<QuestSearchModel>({
  quests: [],
  filteredQuests: [],
  selectedQuest: [],

  setQuests: action((state, quests) => {
    state.quests = quests
  }),

  setFilteredQuests: action((state, quests) => {
    state.filteredQuests = quests
  }),

  setSelectedQuests: action((state, quests) => {
    state.selectedQuest = quests
  }),
})
