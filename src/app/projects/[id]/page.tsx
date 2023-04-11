'use client'

import { useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'

import { getProjectApi } from '@/app/api/client/project'
import Layout from '@/components/layouts/layout'
import { Spinner } from '@/components/spinner/spinner'
import Project from '@/modules/project'
import { useStoreActions } from '@/store/store'

export default function ProjectPage(props: { params: { id: string } }) {
  const [loading, setLoading] = useState<boolean>(true)
  const projectAction = useStoreActions((action) => action.project.upCurProject)

  useEffect(() => {
    fetchProject()
  }, [])

  const fetchProject = async () => {
    try {
      const rs = await getProjectApi(props.params.id)
      projectAction(rs.data!.project)
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
