import { FC, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import {
  getFollowCommunitiesApi,
  getMyFollowerInfoApi,
  newFollowCommunityApi,
} from '@/api/communitiy'
import { ErrorCodes } from '@/constants/code.const'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { CommunityType, FollowCommunityType } from '@/types/community'
import { onCopy } from '@/utils/helper'
import { ButtonTypeEnum, NegativeButton, PositiveButton } from '@/widgets/buttons'
import { HorizontalCenter } from '@/widgets/orientation'
import { CheckIcon, ShareIcon } from '@heroicons/react/24/outline'

const BorderShare = tw.div`
  p-2
  border
  border-solid
  border-gray-300
  rounded-lg
  cursor-pointer
`

const GapHorizontal = tw(HorizontalCenter)`gap-2`

const FollowCommunity: FC<{
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

  const fetchMyFollowerInfo = async () => {
    try {
      const resp = await getMyFollowerInfoApi(community.handle)
      if (resp.error) {
        toast.error(resp.error)
        return
      }

      if (resp.data) {
        onCopy(resp.data.invite_code)
        return
      }
    } catch (error) {
      toast.error(error as string)
    }
  }

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
      <GapHorizontal>
        <PositiveButton type={ButtonTypeEnum.SUCCESS_BORDER}>
          <CheckIcon className='w-6 h-6 text-success' />
          {'Following'}
        </PositiveButton>
        <BorderShare onClick={fetchMyFollowerInfo}>
          <ShareIcon className='w-6 h-6 text-gray-900' />
        </BorderShare>
      </GapHorizontal>
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
