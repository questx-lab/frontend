import { FC, useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import { listCommunitiesApi } from '@/api/communitiy'
import { OtherCommunities } from '@/platform/routes/homepage'
import { CommunityType } from '@/types/community'
import Trending from '@/widgets/trending'

const Index: FC = () => {
  const [communities, setCommunities] = useState<CommunityType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchListCommunities = useCallback(async (query: string) => {
    try {
      setLoading(true)
      const result = await listCommunitiesApi(0, 50, query, true)
      if (result.code === 0 && result.data?.communities) {
        setCommunities(result.data.communities)
      }
    } catch (error) {
      toast.error('Error while fetching communities')
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchListCommunities('')
  }, [])

  return (
    <Trending title='🔥 Trending Communities' loading={loading}>
      <OtherCommunities communities={communities} />
    </Trending>
  )
}

export default Index
