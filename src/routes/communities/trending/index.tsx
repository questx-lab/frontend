import { FunctionComponent, useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import { listCommunitiesApi } from '@/app/api/client/communitiy'
import { OtherCommunities } from '@/routes/homepage'
import { CommunityType } from '@/utils/type'
import Trending from '@/widgets/trending'

export const Index: FunctionComponent = () => {
  const [query, setQuery] = useState<string>('')
  const [communities, setCommunities] = useState<CommunityType[]>([])
  const [initCommunities, setInitCommunities] = useState<CommunityType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchListCommunities = useCallback(async (query: string) => {
    try {
      setLoading(true)
      const result = await listCommunitiesApi(0, 50, query, true)
      if (result.code === 0 && result.data?.communities) {
        if (query === '') {
          setInitCommunities(result.data.communities)
        }
        setCommunities(result.data.communities)
      }
    } catch (error) {
      toast.error('Error while fetching communities')
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    if (query.length > 2) {
      fetchListCommunities(query)
    }
  }, [query])

  useEffect(() => {
    fetchListCommunities('')
  }, [])

  return (
    <Trending
      query={query}
      data={communities}
      title='🔥 Trending Communities'
      hint='Search communities'
      onChange={setQuery}
      result={<OtherCommunities communities={communities} />}
      loading={loading}
    >
      <OtherCommunities communities={initCommunities} />
    </Trending>
  )
}
