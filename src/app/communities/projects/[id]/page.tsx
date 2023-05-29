'use client'

import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { getCommunityApi } from '@/app/api/client/community'
import { Layout } from '@/components/layout'
import { CommunityRoleEnum } from '@/constants/common.const'
import CommunityGuest from '@/modules/community/community-guest'
import ManageProject from '@/modules/community/manage'
import { CommunityStore } from '@/store/local/community.store'
import { GlobalStoreModel } from '@/store/store'
import { CollaboratorType } from '@/utils/type'
import ErrorPage from '@/widgets/error'
import { Spinner } from '@/widgets/spinner'

const ProjectBox: FunctionComponent<{ communityId: string }> = ({
  communityId,
}) => {
  const searchParams =
    useSearchParams() || new ReadonlyURLSearchParams(new URLSearchParams())

  const [loading, setLoading] = useState<boolean>(true)
  const [errorPage, setErrorPage] = useState<boolean>(false)

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

  const setInviteBy = CommunityStore.useStoreActions(
    (action) => action.setInviteBy
  )

  useEffect(() => {
    setInviteBy(searchParams.get('invited_by') as string)
  }, [searchParams.get('invited_by')])

  // hook
  useEffect(() => {
    fetchCommunity()
  }, [projectCollab])

  // handler
  const fetchCommunity = async () => {
    try {
      const rs = await getCommunityApi(communityId)
      if (rs.error) {
        // toast.error(rs.error)
        setErrorPage(true)
      } else {
        setProject(rs.data?.community!)
        if (projectCollab) {
          const filter = projectCollab.filter(
            (e) => e.community.handle === rs.data?.community.handle
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

  if (errorPage) {
    return <ErrorPage />
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
