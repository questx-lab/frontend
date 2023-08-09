import { FC, useEffect } from 'react'

import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { getQuestApi } from '@/api/quest'
import ActiveQuestStore from '@/store/local/active-quest'

const QuestDetail: FC = () => {
  const { questId } = useParams()
  const setActiveQuest = ActiveQuestStore.useStoreActions((action) => action.setQuest)

  useEffect(() => {
    if (questId) {
      getQuest()
    }
  }, [])

  if (!questId) {
    return <></>
  }

  const getQuest = async () => {
    try {
      const { error, data } = await getQuestApi(questId)
      if (error) {
        toast.error(error)
        return
      }
      if (data) {
        setActiveQuest(data)
      }
    } catch (error) {}
  }

  return <></>
}

export default QuestDetail
