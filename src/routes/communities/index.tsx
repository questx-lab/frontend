import { listCommunitiesApi } from '@/app/api/client/communitiy'
import { List } from '@/routes/communities/list'
import { CommunityStore } from '@/store/local/community'
import { CommunityType } from '@/utils/type'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { SearchInput } from '@/widgets/search-input'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import tw from 'twin.macro'

const VerticalPadding = tw(Vertical)`
  w-full
  py-2
`

const SearchPadding = tw(Horizontal)`
  w-full gap-3 py-3
`

export const Index: FunctionComponent = () => {
  // hook
  const [loading, setLoading] = useState<boolean>(true)
  const [communities, setCommunities] = useState<CommunityType[]>([])

  // data
  const query = CommunityStore.useStoreState((state) => state.query)

  // actions
  const setQuery = CommunityStore.useStoreActions((action) => action.setQuery)

  const fetchListProjects = useCallback(async (query: string) => {
    try {
      const result = await listCommunitiesApi(0, 50, query)
      if (result.code === 0) {
        setCommunities(communities)
      }

      setLoading(false)
    } catch (error) {
      toast.error('Error while fetching projects')
      setLoading(false)
    }
  }, [])

  // First fetch
  useEffect(() => {
    fetchListProjects('')
  }, [])

  // Fetch project list
  useEffect(() => {
    if (query.length > 2) {
      fetchListProjects(query)
    }
  }, [query, fetchListProjects])

  return (
    <>
      <VerticalPadding>This is communities</VerticalPadding>
      <SearchPadding>
        <SearchInput hint={'Search Community'} onChanged={(value) => setQuery(value)} />
        <List communities={communities} loading />
      </SearchPadding>
    </>
  )
}
