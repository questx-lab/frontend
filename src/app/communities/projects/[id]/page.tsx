'use client'

import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'

import { getProjectApi } from '@/app/api/client/project'
import { Layout } from '@/components/layout'
import { ProjectRoleEnum } from '@/constants/project.const'
import ManageProject from '@/modules/project/manage'
import ProjectGuess from '@/modules/project/project-guess'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { NewProjectStore } from '@/store/local/project.store'
import { GlobalStoreModel } from '@/store/store'
import { Spinner } from '@/widgets/spinner'

const ProjectBox: FunctionComponent<{ projectId: string }> = ({
  projectId,
}) => {
  const [loading, setLoading] = useState<boolean>(true)

  // data
  const userState = useStoreState<GlobalStoreModel>((state) => state.user)
  const role = NewProjectStore.useStoreState((state) => state.role)

  // action
  const setRole = NewProjectStore.useStoreActions((action) => action.setRole)
  const setProject = NewProjectStore.useStoreActions(
    (action) => action.setProject
  )

  // hook
  useEffect(() => {
    fetchProject()
  }, [userState])

  // handler

  const fetchProject = async () => {
    try {
      const rs = await getProjectApi(projectId)
      if (rs.error) {
        toast.error(rs.error)
      } else {
        setProject(rs.data?.project!)
        if (userState && Object.keys(userState).length) {
          if (userState.id === rs.data?.project.created_by) {
            setRole(ProjectRoleEnum.OWNER)
          } else {
            setRole(ProjectRoleEnum.GUESS)
          }
        }
      }

      setLoading(false)
    } catch (error) {
      toast.error('Error while fetch project')
      setLoading(false)
    }
  }
  if (loading) {
    return <Spinner />
  }

  if (role === ProjectRoleEnum.GUESS) {
    return <ProjectGuess />
  }

  return <ManageProject />
}

export default function ProjectPage(props: { params: { id: string } }) {
  return (
    <Layout>
      <header>
        <title>{'Project'}</title>
      </header>
      <NewProjectStore.Provider>
        <NewQuestStore.Provider>
          <ProjectBox projectId={props.params.id} />
        </NewQuestStore.Provider>
      </NewProjectStore.Provider>
    </Layout>
  )
}
