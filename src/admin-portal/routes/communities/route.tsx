import { FC, useEffect } from 'react'

import { json, Outlet, useLoaderData } from 'react-router-dom'
import { listCommunitiesApi } from '@/api/communitiy'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import AdminPortalStore from '@/store/local/admin-portal'

import { CommunityType } from '@/types/community'

export const Loader = async () => {
  const communityResult = await listCommunitiesApi()
  if (communityResult.code === 0 && communityResult.data) {
    return json(
      {
        communities: communityResult.data.communities,
      },
      { status: 200 }
    )
  }
  return {}
}

const Communities: FC = () => {
  let data = useLoaderData() as {
    communities: CommunityType[]
  }

  const setTab = AdminPortalStore.useStoreActions((action) => action.setTab)
  const setCommunities = AdminPortalStore.useStoreActions((action) => action.setCommunities)

  useEffect(() => {
    setTab(ControlPanelTab.COMMUNITIES)
    if (data.communities) {
      console.log('data.communities', data.communities)
      setCommunities(data.communities)
    }
  }, [data.communities])

  return <Outlet />
}

export default Communities
