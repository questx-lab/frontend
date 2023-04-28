import { createContextStore, Action, action } from 'easy-peasy'
import { QuestTypeEnum, QuestRecurrence } from '@/constants/project.const'

interface NewQuestModel {
  title: string
  description: string
  questType: QuestTypeEnum
  textAutoValid: boolean
  recurrence: QuestRecurrence

  // Actions
  onTitleChanged: Action<NewQuestModel, string>
  onDescriptionChanged: Action<NewQuestModel, string>
  onQuestTypeChanged: Action<NewQuestModel, QuestTypeEnum>
  onTextAutoValid: Action<NewQuestModel, boolean>
  onRecurrenceChanged: Action<NewQuestModel, QuestRecurrence>
}

const NewQuestStore = createContextStore<NewQuestModel>({
  title: '',
  description: '',
  questType: QuestTypeEnum.URL,
  textAutoValid: false,
  recurrence: QuestRecurrence.ONCE,

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
})

export { NewQuestStore }
