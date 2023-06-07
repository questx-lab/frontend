import { FunctionComponent, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'

import { getFollowCommunitiesApi, newFollowCommunityApi } from '@/api/communitiy'
import { ErrorCodes } from '@/constants/code.const'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { CommunityType, FollowCommunityType } from '@/types/community'
import { ButtonTypeEnum, NegativeButton, PositiveButton } from '@/widgets/buttons'
import { CheckIcon } from '@heroicons/react/24/outline'

const FollowCommunity: FunctionComponent<{
  community: CommunityType
}> = ({ community }) => {
  const [loading, setLoading] = useState<boolean>(false)

  // data
  const invitedBy = CommunityStore.useStoreState((state) => state.invitedBy)
  const communitiesFollowing: FollowCommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesFollowing
  )

  // action
  const setCommunitiesFollowing = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesFollowing
  )
  const setShowLoginModal = useStoreActions<GlobalStoreModel>((action) => action.setShowLoginModal)

  // handler
  const communityExist =
    communitiesFollowing &&
    communitiesFollowing.filter((follow) => follow.community.handle === community.handle)
  const handleFollow = async () => {
    setLoading(true)
    try {
      const data = await newFollowCommunityApi(community.handle, invitedBy)
      if (data.code === ErrorCodes.UNAUTHOR) {
        setShowLoginModal(true)
      }

      if (data.code === ErrorCodes.NOT_ERROR) {
        const result = await getFollowCommunitiesApi()

        if (result.code === ErrorCodes.NOT_ERROR) {
          setCommunitiesFollowing(result.data?.followers)
        }
      }
    } catch (error) {
      toast.error('Server error')
    } finally {
      setLoading(false)
    }
  }

  if (communityExist && communityExist.length) {
    return (
      <PositiveButton type={ButtonTypeEnum.SUCCESS_BORDER}>
        <CheckIcon className='w-6 h-6 text-success' />
        {'Following'}
      </PositiveButton>
    )
  }

  const ContentBtn = () => {
    if (loading) {
      return <MoonLoader color='hsla(168, 0%, 100%, 1)' loading speedMultiplier={0.8} size={20} />
    }

    return <span>{'Follow'}</span>
  }

  return (
    <NegativeButton onClick={handleFollow}>
      <ContentBtn />
    </NegativeButton>
  )
}

export default FollowCommunity
