'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { Layout } from '@/components/layout'
import { ProjectType } from '@/types/project.type'

import { listProjectsApi } from '../api/client/project'

export default function ExplorePage() {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()

  useEffect(() => {
    fetchListProjects()
  }, [])

  const fetchListProjects = async () => {
    try {
      const list = await listProjectsApi()
      setProjects(list.data!.projects)
      setLoading(false)
    } catch (error) {
      toast.error('Error while fetching projects')
      setLoading(false)
    }
  }

  return (
    <Layout>
      <header>
        <title>{'Explore'}</title>
      </header>
    </Layout>
  )
}
