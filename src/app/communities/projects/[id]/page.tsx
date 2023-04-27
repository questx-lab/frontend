'use client'

import { useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'

import { getProjectApi } from '@/app/api/client/project'
import Layout from '@/components/layouts/layout'
import { Spinner } from '@/components/spinner/spinner'
import Leaderboard from '@/modules/project/leaderboard/page'
import ManageProject from '@/modules/project/manage/page'
import { useStoreActions, useStoreState } from '@/store/store'

export default function ProjectPage(props: { params: { id: string } }) {
  const [loading, setLoading] = useState<boolean>(true)
  const projectAction = useStoreActions((action) => action.project.upCurProject)
  const userState = useStoreState((state) => state.userSession.user)
  const [isGuess, setIsGuess] = useState<boolean>(true)

  useEffect(() => {
    fetchProject()
  }, [userState])

  const fetchProject = async () => {
    try {
      const rs = await getProjectApi(props.params.id)
      projectAction(rs.data!.project)
      if (userState && Object.keys(userState).length) {
        if (userState.id === rs.data?.project.created_by) {
          setIsGuess(false)
        } else {
          setIsGuess(true)
        }
      }
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
      {!loading && isGuess && <Leaderboard />}
      {!loading && !isGuess && <ManageProject projectId={props.params.id} />}
      {loading && <Spinner />}
    </Layout>
  )
}
