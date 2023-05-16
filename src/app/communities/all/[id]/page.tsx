'use client'

import { useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'

import { getProjectApi } from '@/app/api/client/project'
import { Layout } from '@/components/layout'
import Project from '@/modules/project'
import { CommunityStore } from '@/store/local/community.store'
import { Spinner } from '@/widgets/spinner'

export default function ProjectPage(props: { params: { id: string } }) {
  // data
  const [loading, setLoading] = useState<boolean>(true)

  // actions
  const setProject = CommunityStore.useStoreActions(
    (action) => action.setProject
  )

  useEffect(() => {
    fetchProject()
  }, [])

  const fetchProject = async () => {
    try {
      const rs = await getProjectApi(props.params.id)
      setProject(rs.data!.project)
      setLoading(false)
    } catch (error) {
      toast.error('Error while fetch project')
      setLoading(false)
    }
  }

  return (
    <Layout>
      <header>
        <title>{'Project'}</title>
      </header>
      {!loading && <Project />}
      {loading && <Spinner />}
    </Layout>
  )
}
