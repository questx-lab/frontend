import { createContextStore, Action, action } from 'easy-peasy'
import { QuestTypeEnum } from '@/constants/project.const'

interface NewQuestModel {
  title: string
  description: string
  questType: QuestTypeEnum
  textAutoValid: boolean

  // Actions
  onTitleChanged: Action<NewQuestModel, string>
  onDescriptionChanged: Action<NewQuestModel, string>
  onQuestTypeChanged: Action<NewQuestModel, QuestTypeEnum>
  onTextAutoValid: Action<NewQuestModel, boolean>
}

const NewQuestStore = createContextStore<NewQuestModel>({
  title: '',
  description: '',
  questType: QuestTypeEnum.URL,
  textAutoValid: false,

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
})

export { NewQuestStore }
