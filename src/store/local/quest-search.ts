import { action, Action, createContextStore } from 'easy-peasy'

import { QuestType } from '@/utils/type'

interface QuestSearchModel {
  allQuests: QuestType[]
  filteredQuests: QuestType[]
  selectedQuest: QuestType[]

  setAllQuests: Action<QuestSearchModel, QuestType[]>
  setFilteredQuests: Action<QuestSearchModel, QuestType[]>
  setSelectedQuests: Action<QuestSearchModel, QuestType[]>
}

const NewQuestSearchStore = createContextStore<QuestSearchModel>({
  allQuests: [],
  filteredQuests: [],
  selectedQuest: [],

  setAllQuests: action((state, quests) => {
    state.allQuests = quests
  }),

  setFilteredQuests: action((state, quests) => {
    state.filteredQuests = quests
  }),

  setSelectedQuests: action((state, quests) => {
    state.selectedQuest = quests
  }),
})

export default NewQuestSearchStore
