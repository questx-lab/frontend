import { FunctionComponent, useEffect, useState } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'
import tw from 'twin.macro'

import { getFollowCommunitiesApi, getInviteApi, newFollowCommunityApi } from '@/api/communitiy'
import { ErrorCodes } from '@/constants/code.const'
import { CommunityRoleEnum } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { CommunityType, FollowCommunityType } from '@/types/community'
import { PositiveButton } from '@/widgets/buttons'
import { CircularImage } from '@/widgets/circular-image'
import BasicModal from '@/widgets/modal/basic'
import { VerticalFullWidthCenter } from '@/widgets/orientation'
import { SmallSpinner } from '@/widgets/spinner'
import { Large3xlText, LargeText } from '@/widgets/text'

const Content = tw(VerticalFullWidthCenter)`
  w-full
  h-full
  gap-2
  p-4
`

const PrimaryLargeText = tw(Large3xlText)`
  text-primary
  font-bold
  line-clamp-1
`

const CommunityContent: FunctionComponent<{ community: CommunityType | undefined }> = ({
  community,
}) => {
  if (!community) {
    return (
      <VerticalFullWidthCenter>
        <SmallSpinner />
      </VerticalFullWidthCenter>
    )
  }

  return (
    <VerticalFullWidthCenter>
      <CircularImage
        width={80}
        height={80}
        src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
      />
      <PrimaryLargeText>{community.display_name}</PrimaryLargeText>
    </VerticalFullWidthCenter>
  )
}

const ActionButton: FunctionComponent<{
  community: CommunityType | undefined
  userInvite: UserType | undefined
  onChangeModal: (value: boolean) => void
}> = ({ community, userInvite, onChangeModal }) => {
  // hook
  const [loading, setLoading] = useState<boolean>(false)

  // data
  const communitiesFollowing: FollowCommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesFollowing
  )
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  // action
  const setShowLoginModal = useStoreActions<GlobalStoreModel>((action) => action.setShowLoginModal)
  const setCommunitiesFollowing = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesFollowing
  )

  // Required login when anonymous
  if (!user) {
    return (
      <PositiveButton onClick={() => setShowLoginModal(true)}>
        {'Connect your account'}
      </PositiveButton>
    )
  }

  // Api getting community
  if (!community) {
    return <></>
  }

  // Check community was followed by user before?
  const hasFollowed = communitiesFollowing.filter(
    (follow) => follow.community.handle === community.handle
  )
  if (hasFollowed.length !== 0) {
    return <PositiveButton block>{"You're already part of this community"}</PositiveButton>
  }

  // Handle invite
  const onAcceptInvite = async () => {
    setLoading(true)
    try {
      if (userInvite && community) {
        const result = await newFollowCommunityApi(community.handle, userInvite?.id)
        if (result.error) {
          toast.error(result.error)
        }

        if (result.code === ErrorCodes.NOT_ERROR) {
          toast.success('Successfully joined community!')
        }

        // Update following community
        const newFollowingCommunity = await getFollowCommunitiesApi()
        if (newFollowingCommunity.data && newFollowingCommunity.data.followers) {
          setCommunitiesFollowing(newFollowingCommunity.data.followers)
        }

        // Close modal
        onChangeModal(false)
      }
    } catch (error) {
    } finally {
      setLoading(true)
    }
  }

  return (
    <PositiveButton loading={loading} onClick={onAcceptInvite}>
      {'Accept invitation'}
    </PositiveButton>
  )
}

const InviteModal: FunctionComponent<{ inviteCode: string; community: CommunityType }> = ({
  inviteCode,
  community,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(inviteCode !== '')
  const [userInvite, setUserInvite] = useState<UserType>()

  const role = CommunityStore.useStoreState((state) => state.role)

  const onChangeModal = (value: boolean) => {
    setOpenModal(value)
  }

  const getInvite = async () => {
    try {
      const result = await getInviteApi(inviteCode)
      if (result.error) {
        toast.error(result.error)
        setOpenModal(false)
      }

      if (result.data) {
        setUserInvite(result.data.user)
        if (result.data.community.handle !== community.handle) {
          setOpenModal(false)
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (
      (role && role === CommunityRoleEnum.EDITOR) ||
      role === CommunityRoleEnum.OWNER ||
      role === CommunityRoleEnum.REVIEWER
    ) {
      setOpenModal(false)
    } else {
      if (inviteCode !== '' && community.handle !== '') {
        getInvite()
      }
    }
  }, [role, community])

  return (
    <BasicModal
      isOpen={openModal}
      onClose={() => onChangeModal(false)}
      styled={'flex flex-col !justify-start !items-start !w-[500px] !h-[300px]'}
    >
      <Content>
        <LargeText>{'You have been invited to join'}</LargeText>
        <CommunityContent community={community} />
        <ActionButton community={community} userInvite={userInvite} onChangeModal={onChangeModal} />
      </Content>
    </BasicModal>
  )
}

export default InviteModal
