'use client'

import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'

import { getCommunityApi } from '@/app/api/client/community'
import { Layout } from '@/components/layout'
import { ProjectRoleEnum } from '@/constants/common.const'
import CommunityGuest from '@/modules/community/community-guest'
import ManageProject from '@/modules/community/manage'
import { CommunityStore } from '@/store/local/community.store'
import { GlobalStoreModel } from '@/store/store'
import { CollaboratorType } from '@/utils/type'
import { Spinner } from '@/widgets/spinner'

const ProjectBox: FunctionComponent<{ projectId: string }> = ({
  projectId,
}) => {
  const [loading, setLoading] = useState<boolean>(true)

  // data

  const projectCollab: CollaboratorType[] = useStoreState<GlobalStoreModel>(
    (state) => state.projectCollab
  )
  const role = CommunityStore.useStoreState((state) => state.role)

  // action
  const setRole = CommunityStore.useStoreActions((action) => action.setRole)
  const setProject = CommunityStore.useStoreActions(
    (action) => action.setProject
  )

  // hook
  useEffect(() => {
    fetchProject()
  }, [projectCollab])

  // handler
  const fetchProject = async () => {
    try {
      const rs = await getCommunityApi(projectId)
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
    return <CommunityGuest />
  }

  return <ManageProject />
}

export default function ProjectPage(props: { params: { id: string } }) {
  return (
    <Layout>
      <header>
        <title>{'Project'}</title>
      </header>
      <CommunityStore.Provider>
        <ProjectBox projectId={props.params.id} />
      </CommunityStore.Provider>
    </Layout>
  )
}
