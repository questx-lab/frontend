import { FC, ReactNode, useEffect } from 'react'

import { useStoreState } from 'easy-peasy'

import useChannels from '@/modules/chat/hooks/use-channels'
import AskToFollow from '@/modules/chat/popover/ask-to-follow'
import chatController from '@/modules/chat/services/chat-controller'
import ChatStore from '@/store/chat/chat'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { FollowCommunityType } from '@/types/community'

const Index: FC<{ children: ReactNode }> = ({ children }) => {
  // data
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const communitiesFollowing: FollowCommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesFollowing
  )
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const channels = useChannels(community.handle)
  const currentChannel = ChatStore.useStoreState((state) => state.selectedChannel)

  // actions
  const setCurrentChannel = ChatStore.useStoreActions((action) => action.setChannel)

  // Check if user follows this community. If not, ask them to join the community.
  const didFollowCommunity =
    communitiesFollowing &&
    communitiesFollowing.some((follow) => follow.community.handle === community.handle)

  useEffect(() => {
    // get Channels
    if (user && community.handle) {
      chatController.loadChannels(community.handle)
    }
  }, [user, community.handle])

  // Set a default channel if it is not defined
  useEffect(() => {
    if (currentChannel.id === BigInt(0) && channels.length > 0) {
      setCurrentChannel(channels[0])
    }
  }, [currentChannel.id, channels, setCurrentChannel])

  if (!community) {
    return <></>
  }

  if (!didFollowCommunity) {
    return <AskToFollow />
  }

  return <>{children}</>
}

export default Index
