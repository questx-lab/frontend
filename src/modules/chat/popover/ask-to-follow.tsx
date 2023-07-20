import { FC } from 'react'

import { useStoreActions } from 'easy-peasy'
import tw from 'twin.macro'

import { getFollowCommunitiesApi, newFollowCommunityApi } from '@/api/communitiy'
import { ErrorCodes } from '@/constants/code.const'
import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { NegativeButton } from '@/widgets/buttons'
import { VerticalFullWidthCenter } from '@/widgets/orientation'

const AskToFollowFrame = tw(VerticalFullWidthCenter)`
  h-full
`

const AskToFollow: FC = () => {
  // data
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const invitedBy = CommunityStore.useStoreState((state) => state.invitedBy)

  // actions
  const setCommunitiesFollowing = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesFollowing
  )

  const onJoinClicked = async () => {
    const data = await newFollowCommunityApi(community.handle, invitedBy)
    if (data.code === ErrorCodes.NOT_ERROR) {
      const result = await getFollowCommunitiesApi()

      if (result.code === ErrorCodes.NOT_ERROR) {
        setCommunitiesFollowing(result.data?.followers)
      }
    }
  }

  return (
    <AskToFollowFrame>
      Please, join this community to chat
      <Padding />
      <NegativeButton onClick={onJoinClicked}>Join</NegativeButton>
    </AskToFollowFrame>
  )
}

export default AskToFollow
