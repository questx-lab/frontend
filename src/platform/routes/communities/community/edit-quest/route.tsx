import { FC } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

import { CommunityRoleEnum } from '@/constants/common.const'
import { communityRoute } from '@/constants/router.const'
import CommunityStore from '@/store/local/community'

const EditQuest: FC = () => {
  const navigate = useNavigate()
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const role = CommunityStore.useStoreState((state) => state.role)

  if (!community || role !== CommunityRoleEnum.OWNER) {
    navigate(communityRoute(community.handle))
    return <></>
  }

  return <Outlet />
}

export default EditQuest
