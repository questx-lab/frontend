import { FC, useEffect } from 'react'

import { json, Outlet, Params, useLoaderData, useNavigate } from 'react-router-dom'

import { getCommunityApi } from '@/api/communitiy'
import { RouterConst } from '@/constants/router.const'
import CommunityStore from '@/store/local/community'
import { CommunityType } from '@/types/community'
import { isLogin } from '@/utils/helper'

export const Loader = async (args: { params: Params }) => {
  const [communityResult] = await Promise.all([
    getCommunityApi(args.params['communityHandle'] || ''),
  ])

  const community = communityResult.code === 0 ? communityResult.data?.community : undefined

  if (communityResult.code === 0) {
    return json(
      {
        community,
      },
      { status: 200 }
    )
  }

  return {}
}

const MessageCommunity: FC = () => {
  let data = useLoaderData() as {
    community: CommunityType
  }

  // actions
  const setSelectedCommunity = CommunityStore.useStoreActions(
    (action) => action.setSelectedCommunity
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin()) {
      navigate(RouterConst.COMMUNITIES)
    } else {
      // Set the community
      if (data.community) {
        setSelectedCommunity(data.community)
      }
    }
  }, [])

  return <Outlet />
}

export default MessageCommunity
