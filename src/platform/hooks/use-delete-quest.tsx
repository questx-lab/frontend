import { useEffect, useState } from 'react'

import broadcast, { BroadcastEventType } from '@/types/broadcast'
import { emptyQuest, QuestType } from '@/types/quest'

export default function useDeleteQuest() {
  const [deletedQuest, setDeletedQuest] = useState<QuestType>(emptyQuest())

  useEffect(() => {
    const listener = {
      onEvent: (event: BroadcastEventType, data: QuestType) => {
        setDeletedQuest(data)
      },
    }

    broadcast.addListener(BroadcastEventType.DELETE_QUEST, listener)

    return () => {
      broadcast.removeListener(BroadcastEventType.DELETE_QUEST, listener)
    }
  }, [])

  return deletedQuest
}
