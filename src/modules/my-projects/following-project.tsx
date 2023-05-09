import { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'

import { listProjectsApi } from '@/app/api/client/project'
import { NewProjectStore } from '@/store/local/project.store'
import {
  FFitlerBox,
  FSearchBox,
  FSearchInput,
  FSearchWrap,
  FWrap,
  WrapProjects,
} from '@/styles/explore.style'
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

import ProjectBox from '../project/project-box'

export default function FollowingProject() {
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  // Data
  const projects = NewProjectStore.useStoreState((state) => state.projects)
  const query = NewProjectStore.useStoreState((state) => state.query)
  const searchProjects = NewProjectStore.useStoreState(
    (state) => state.searchProjects
  )

  // Action
  const setProjects = NewProjectStore.useStoreActions(
    (action) => action.setProjects
  )
  const setQuery = NewProjectStore.useStoreActions((action) => action.setQuery)
  const setSearchProjects = NewProjectStore.useStoreActions(
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
