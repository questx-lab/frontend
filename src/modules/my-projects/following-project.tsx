'use client'
import { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import tw from 'twin.macro'
import { useDebouncedCallback } from 'use-debounce'

import { listProjectsApi } from '@/app/api/client/project'
import { CommunityStore } from '@/store/local/community.store'
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

import ProjectBox from '../project/project-box'
import { Horizontal, Vertical } from '@/widgets/orientation'

const FSearchInput = tw.input`
  border-0
  ring-0
  outline-none
  text-lg
  w-full
`

const FFitlerBox = tw(Horizontal)`
  gap-3
  border
  border-solid
  border-gray-300
  py-2 px-3
  rounded-lg
  items-center
`

const FSearchBox = tw(Horizontal)`
  gap-3
  border
  border-solid
  border-gray-300
  py-2
  px-3
  justify-start
  items-center
  w-full
  rounded-lg
`

const FSearchWrap = tw(Horizontal)`
  w-full gap-3 py-3
`

const FWrap = tw(Vertical)`
  py-2
`

const WrapProjects = tw.div`
  grid
  grid-cols-4
  gap-4
  max-2xl:grid-cols-3
  max-xl:grid-cols-2
  max-sm:grid-cols-1
`

export default function FollowingProject() {
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  // Data
  const projects = CommunityStore.useStoreState((state) => state.projects)
  const query = CommunityStore.useStoreState((state) => state.query)
  const searchProjects = CommunityStore.useStoreState(
    (state) => state.searchProjects
  )

  // Action
  const setProjects = CommunityStore.useStoreActions(
    (action) => action.setProjects
  )
  const setQuery = CommunityStore.useStoreActions((action) => action.setQuery)
  const setSearchProjects = CommunityStore.useStoreActions(
    (action) => action.setSearchProjects
  )

  useEffect(() => {
    fetchListProjects()
  }, [])

  useEffect(() => {
    if (query.length > 2) {
      setTimeout(() => fetchListProjects(query, true), 1000)
    }
  }, [query])

  // Handler
  const debounced = useDebouncedCallback((value) => {
    setQuery(value)
  }, 500)

  const fetchListProjects = async (query: string = '', isSearch = false) => {
    try {
      if (isSearch) {
        const list = await listProjectsApi(0, 50, query)
        setSearchProjects(list.data!.projects)
      } else {
        const list = await listProjectsApi()
        setProjects(list.data!.projects)
      }

      setLoading(false)
    } catch (error) {
      toast.error('Error while fetching projects')
      setLoading(false)
    }
  }

  const projectsList =
    projects && projects.map((e) => <ProjectBox key={e.id} project={e} />)

  const projectsSearch =
    searchProjects &&
    searchProjects.map((e) => <ProjectBox key={e.id} project={e} />)

  const ProjectWrap: FunctionComponent = () => {
    if (query.length > 2) {
      return <WrapProjects>{projectsSearch}</WrapProjects>
    }

    return <WrapProjects>{projectsList}</WrapProjects>
  }

  return (
    <FWrap>
      <FSearchWrap>
        <FSearchBox>
          <MagnifyingGlassIcon className='w-5 h-5 text-gray-500' />
          <FSearchInput
            className='border-0 ring-0 outline-none text-lg'
            placeholder='Search Community'
            onChange={(e) => debounced(e.target.value)}
          />
        </FSearchBox>
        <FFitlerBox>
          <AdjustmentsHorizontalIcon className='w-5 h-5' />
          {'Filter'}
        </FFitlerBox>
      </FSearchWrap>
      {!loading && <ProjectWrap />}
    </FWrap>
  )
}
