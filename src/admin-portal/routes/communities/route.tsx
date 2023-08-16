import { FC, useEffect } from 'react'

import { json, Outlet, useLoaderData } from 'react-router-dom'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import { listCommunitiesApi } from '@/api/communitiy'
import AdminCommunityStore from '@/store/admin/community'
import AdminPortalStore from '@/store/admin/portal'
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

const OutletView: FC<{ communities: CommunityType[] }> = ({ communities }) => {
  const setTab = AdminPortalStore.useStoreActions((action) => action.setTab)
  const setCommunities = AdminCommunityStore.useStoreActions((action) => action.setCommunities)

  useEffect(() => {
    setTab(ControlPanelTab.COMMUNITIES)
    if (communities) {
      setCommunities(communities)
    }
  }, [communities])

  return <Outlet />
}

const Communities: FC = () => {
  let data = useLoaderData() as {
    communities: CommunityType[]
  }

  return (
    <AdminCommunityStore.Provider>
      <OutletView communities={data.communities} />
    </AdminCommunityStore.Provider>
  )
}

export default Communities
