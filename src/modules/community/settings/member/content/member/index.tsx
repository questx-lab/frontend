import { FC, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { getCommunityFollowersApi } from '@/api/communitiy'
import { RolePermissionColor } from '@/constants/common.const'
import AddRoleMember from '@/modules/community/settings/member/content/member/add-role-member'
import FormMember from '@/modules/community/settings/member/content/member/form-member'
import {
  BorderBox,
  ButtonAdd,
  Frame,
  FrameContent,
} from '@/modules/community/settings/member/content/mini-widget'
import { getRoles } from '@/modules/community/settings/member/content/role'
import MemberCommunityStore from '@/store/local/member-community'
import RoleCommunityStore from '@/store/local/role-community'
import { FollowCommunityType } from '@/types/community'
import { UserAvatar } from '@/widgets/avatar'
import { HorizontalBetweenCenterFullWidth, HorizontalFullWidth } from '@/widgets/orientation'
import { Spinner } from '@/widgets/spinner'

const Padding = tw(HorizontalBetweenCenterFullWidth)`
  py-3
  px-6
  gap-3
`

const Width290 = tw(HorizontalFullWidth)`
  w-[290px]
  items-center
  h-full
  text-sm
  gap-1
`

const FixedNameWidth = tw(HorizontalFullWidth)`
  line-clamp-1
  max-w-[200px]
`

const GapHorizontalFullWidth = tw(HorizontalFullWidth)`gap-1 flex-wrap`

const CircleColor = tw.div`w-4 h-4 rounded-full`

const MemberItem: FC<{ member: FollowCommunityType }> = ({ member }) => {
  const renderRole = member.role.map((role, index) => (
    <BorderBox key={index}>
      <CircleColor style={{ backgroundColor: role.color || RolePermissionColor.GRAY }} />
      {role.name}
    </BorderBox>
  ))

  return (
    <Padding>
      <Width290>
        <UserAvatar size={32} user={member.user} />
        <FixedNameWidth>{member.user.name}</FixedNameWidth>
      </Width290>
      <GapHorizontalFullWidth>
        {renderRole}
        <AddRoleMember userRoles={member.role} userId={member.user.id} />
      </GapHorizontalFullWidth>
    </Padding>
  )
}

const RenderMembers: FC<{ loading: boolean }> = ({ loading }) => {
  const members = MemberCommunityStore.useStoreState((state) => state.members)

  if (loading) {
    return <Spinner />
  }

  if (members.length === 0) {
    return <HorizontalFullWidthCenter>{'Users empty'}</HorizontalFullWidthCenter>
  }

  const renderMembers = members.map((member) => <MemberItem key={member.user.id} member={member} />)

  return <FrameContent>{renderMembers}</FrameContent>
}

export const getMembers = async (
  communityHandle: string,
  onMembers: (member: FollowCommunityType[]) => void,
  onLoading?: (value: boolean) => void
) => {
  try {
    const { data, error } = await getCommunityFollowersApi(communityHandle)

    if (error) {
      toast.error(error)
      return
    }

    if (data) {
      onMembers(data.followers)
    }
  } catch (error) {
  } finally {
    if (onLoading) {
      onLoading(false)
    }
  }
}

const MemberContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { communityHandle } = useParams()

  const setShowModal = MemberCommunityStore.useStoreActions((action) => action.setShowModal)
  const setRoles = RoleCommunityStore.useStoreActions((action) => action.setRoles)
  const setMembers = MemberCommunityStore.useStoreActions((action) => action.setMembers)

  useEffect(() => {
    if (communityHandle) {
      getMembers(communityHandle, setMembers, setLoading)
    }
  }, [communityHandle])

  useEffect(() => {
    if (communityHandle) {
      getRoles(communityHandle, setRoles)
    }
  }, [communityHandle])

  if (!communityHandle) {
    return <></>
  }

  const onAdded = () => {
    setShowModal(true)
  }

  return (
    <Frame>
      <ButtonAdd onOpenModal={onAdded} buttonName='Add Member' />
      <RenderMembers loading={loading} />
      <FormMember />
    </Frame>
  )
}

const Member: FC = () => {
  return (
    <MemberCommunityStore.Provider>
      <RoleCommunityStore.Provider>
        <MemberContent />
      </RoleCommunityStore.Provider>
    </MemberCommunityStore.Provider>
  )
}

export default Member
