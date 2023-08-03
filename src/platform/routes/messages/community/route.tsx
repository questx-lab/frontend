import { FC, useEffect } from 'react'

import { json, Outlet, Params, useLoaderData, useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { getCommunityApi } from '@/api/communitiy'
import { RouterConst } from '@/constants/router.const'
import ChatIndex from '@/modules/chat'
import ChannelSide from '@/modules/chat/channel/channel-side'
import chatController from '@/modules/chat/services/chat-controller'
import CommunityStore from '@/store/local/community'
import { CommunityType } from '@/types/community'
import { isLogin } from '@/utils/helper'

const MainFrame = tw.div`
  w-full
  h-[calc(100vh_-_64px)]
  mt-[64px]
`

export const Loader = async (args: { params: Params }) => {
  const [communityResult] = await Promise.all([
    getCommunityApi(args.params['communityHandle'] || ''),
    chatController.loadChannels(args.params['communityHandle'] || ''),
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

const MessagesCommunity: FC = () => {
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

  return (
    <ChatIndex
      children={
        <MainFrame>
          <ChannelSide />
          <Outlet />
        </MainFrame>
      }
    ></ChatIndex>
  )
}

export default MessagesCommunity
