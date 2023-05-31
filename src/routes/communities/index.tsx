import { FunctionComponent, useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { listCommunitiesApi } from '@/app/api/client/communitiy'
import CreateCommunity from '@/modules/create-community'
import { List } from '@/routes/communities/list'
import { CommunityStore } from '@/store/local/community'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { CommunityType } from '@/utils/type'
import { BaseModal } from '@/widgets/modal'
import { Horizontal, HorizontalBetweenCenterFullWidth } from '@/widgets/orientation'
import { SearchInput } from '@/widgets/search-input'
import { PlusIcon } from '@heroicons/react/24/outline'

const SearchPadding = tw(Horizontal)`
  w-full gap-3 py-3
`

const CreateProjectBtn = tw(Horizontal)`
  gap-2
  border
  border-solid
  border-gray-300
  rounded-lg
  justify-center
  items-center
  py-2
  px-4
  text-lg
  text-black
  font-medium
  cursor-pointer
`

export const ModalBox = tw.div`
  flex
  h-full
  items-center
  justify-center
  text-center
  py-6
`

const NewCommunity: FunctionComponent<{
  setOpen: (value: boolean) => void
}> = ({ setOpen }) => {
  return (
    <CreateProjectBtn onClick={() => setOpen(true)}>
      <PlusIcon className={'w-5 h-5 text-black'} />
      {'Create Community'}
    </CreateProjectBtn>
  )
}

export const Index: FunctionComponent = () => {
  // hook
  const [loading, setLoading] = useState<boolean>(true)
  const [isOpen, setOpen] = useState<boolean>(false)
  const [communities, setCommunities] = useState<CommunityType[]>([])

  // data
  const query = CommunityStore.useStoreState((state) => state.query)

  // actions
  const setQuery = CommunityStore.useStoreActions((action) => action.setQuery)

  const fetchListProjects = useCallback(async (query: string) => {
    try {
      setLoading(true)
      const result = await listCommunitiesApi(0, 50, query)
      if (result.code === 0) {
        setCommunities(communities)
      }
    } catch (error) {
      toast.error('Error while fetching projects')
    }

    setLoading(false)
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
      <HorizontalBetweenCenterFullWidth>
        {'👋 Communities'}
        <NewCommunity setOpen={setOpen} />
      </HorizontalBetweenCenterFullWidth>
      <SearchPadding>
        <SearchInput hint={'Search Community'} onChanged={(value) => setQuery(value)} />
        <List communities={communities} loading={loading} />
      </SearchPadding>

      <BaseModal isOpen={isOpen}>
        <ModalBox>
          <NewCommunityStore.Provider>
            <CreateCommunity setOpen={setOpen} />
          </NewCommunityStore.Provider>
        </ModalBox>
      </BaseModal>
    </>
  )
}
