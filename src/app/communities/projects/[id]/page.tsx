'use client'

import { useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'

import { getProjectApi } from '@/app/api/client/project'
import { Layout } from '@/components/layout'
import ManageProject from '@/modules/project/manage'
import ProjectGuess from '@/modules/project/project-guess'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { NewProjectStore } from '@/store/local/project.store'
import { GlobalStoreModel } from '@/store/store'
import { ProjectType } from '@/types/project.type'
import { Spinner } from '@/widgets/spinner'

export default function ProjectPage(props: { params: { id: string } }) {
  const [loading, setLoading] = useState<boolean>(true)
  const userState = useStoreState<GlobalStoreModel>((state) => state.user)
  const [isGuess, setIsGuess] = useState<boolean>(true)
  const [project, setProject] = useState<ProjectType>()

  useEffect(() => {
    fetchProject()
  }, [userState])

  const fetchProject = async () => {
    try {
      const rs = await getProjectApi(props.params.id)
      if (rs.error) {
        toast.error(rs.error)
      } else {
        setProject(rs.data?.project)
        if (userState && Object.keys(userState).length) {
          if (userState.id === rs.data?.project.created_by) {
            setIsGuess(false)
          } else {
            setIsGuess(true)
          }
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
      <NewProjectStore.Provider>
        <NewQuestStore.Provider>
          {!loading && isGuess && <ProjectGuess project={project!} />}
          {!loading && !isGuess && <ManageProject project={project!} />}
        </NewQuestStore.Provider>
      </NewProjectStore.Provider>

      {loading && <Spinner />}
    </Layout>
  )
}
