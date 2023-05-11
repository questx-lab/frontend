'use client'

import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'

import { getProjectApi } from '@/app/api/client/project'
import { Layout } from '@/components/layout'
import { ProjectRoleEnum } from '@/constants/project.const'
import ManageProject from '@/modules/project/manage'
import ProjectGuess from '@/modules/project/project-guess'
import { NewProjectStore } from '@/store/local/project.store'
import { GlobalStoreModel } from '@/store/store'
import { CollaboratorType } from '@/types/project.type'
import { Spinner } from '@/widgets/spinner'

const ProjectBox: FunctionComponent<{ projectId: string }> = ({
  projectId,
}) => {
  const [loading, setLoading] = useState<boolean>(true)

  // data

  const projectCollab: CollaboratorType[] = useStoreState<GlobalStoreModel>(
    (state) => state.projectCollab
  )
  const role = NewProjectStore.useStoreState((state) => state.role)

  // action
  const setRole = NewProjectStore.useStoreActions((action) => action.setRole)
  const setProject = NewProjectStore.useStoreActions(
    (action) => action.setProject
  )

  // hook
  useEffect(() => {
    fetchProject()
  }, [projectCollab])

  // handler
  const fetchProject = async () => {
    try {
      const rs = await getProjectApi(projectId)
      if (rs.error) {
        toast.error(rs.error)
      } else {
        setProject(rs.data?.project!)
        if (projectCollab) {
          const filter = projectCollab.filter(
            (e) => e.project_id === rs.data?.project.id
          )
          if (filter.length === 0) {
            setRole(ProjectRoleEnum.GUEST)
          } else {
            setRole(ProjectRoleEnum.OWNER)
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

  if (role === ProjectRoleEnum.GUEST) {
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
        <ProjectBox projectId={props.params.id} />
      </NewProjectStore.Provider>
    </Layout>
  )
}
