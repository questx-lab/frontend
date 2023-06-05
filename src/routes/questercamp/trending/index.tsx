import { FunctionComponent, useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import { listQuestApi } from '@/api/quest'
import { OtherQuests } from '@/routes/questercamp'
import { QuestType } from '@/utils/type'
import Trending from '@/widgets/trending'

export const Index: FunctionComponent = () => {
  const [query, setQuery] = useState<string>('')
  const [quests, setQuests] = useState<QuestType[]>([])
  const [initQuests, setInitQuests] = useState<QuestType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchListQuests = useCallback(async (query: string) => {
    try {
      setLoading(true)
      const result = await listQuestApi('', query)
      if (result.code === 0 && result.data?.quests) {
        if (query === '') {
          setInitQuests(result.data.quests)
        }
        setQuests(result.data.quests)
      }
    } catch (error) {
      toast.error('Error while fetching quests')
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    if (query.length > 2) {
      fetchListQuests(query)
    }
  }, [query])

  useEffect(() => {
    fetchListQuests('')
  }, [])

  return (
    <Trending title='🔥 Trending Quest' loading={loading}>
      <OtherQuests quests={initQuests} />
    </Trending>
  )
}
