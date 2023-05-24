'use client'

import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'

import { getCommunityApi } from '@/app/api/client/community'
import { Layout } from '@/components/layout'
import { CommunityRoleEnum } from '@/constants/common.const'
import CommunityGuest from '@/modules/community/community-guest'
import ManageProject from '@/modules/community/manage'
import { CommunityStore } from '@/store/local/community.store'
import { GlobalStoreModel } from '@/store/store'
import { CollaboratorType } from '@/utils/type'
import { Spinner } from '@/widgets/spinner'

const ProjectBox: FunctionComponent<{ communityId: string }> = ({
  communityId,
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
    fetchCommunity()
  }, [projectCollab])

  // handler
  const fetchCommunity = async () => {
    try {
      const rs = await getCommunityApi(communityId)
      if (rs.error) {
        toast.error(rs.error)
      } else {
        setProject(rs.data?.community!)
        if (projectCollab) {
          const filter = projectCollab.filter(
            (e) => e.community_id === rs.data?.community.id
          )
          if (filter.length === 0) {
            setRole(CommunityRoleEnum.GUEST)
          } else {
            setRole(CommunityRoleEnum.OWNER)
          }
        }
      }

      setLoading(false)
    } catch (error) {
      toast.error('Error while fetch community')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <header>
          <title>{'Community'}</title>
        </header>
        <Spinner />
      </Layout>
    )
  }

  if (role === CommunityRoleEnum.GUEST) {
    return <CommunityGuest />
  }

  return (
    <Layout>
      <header>
        <title>{'Community'}</title>
      </header>
      <ManageProject />
    </Layout>
  )
}

export default function ProjectPage(props: { params: { id: string } }) {
  return (
    <CommunityStore.Provider>
      <ProjectBox communityId={props.params.id} />
    </CommunityStore.Provider>
  )
}
