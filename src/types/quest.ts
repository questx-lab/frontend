import { QuestRecurrence, QuestTypeEnum } from '@/constants/common.const'
import { emptyCommunity } from '@/types/community'
import { QuestType } from '@/utils/type'

export const emptyQuest = (): QuestType => {
  let q: QuestType = {
    id: '',
    community: emptyCommunity(),
    title: '',
    type: QuestTypeEnum.URL,
    status: '',
    description: '',
    recurrence: QuestRecurrence.ONCE,
    points: 100,
    rewards: [],
    category: {
      id: '',
      name: '',
      created_at: '',
      updated_at: '',
      created_by: '',
    },
    validation_data: {},
  }

  return q
}
