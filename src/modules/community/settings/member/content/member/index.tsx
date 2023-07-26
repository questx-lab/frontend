import { FC, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { getCommunityFollowersApi } from '@/api/communitiy'
import FormMember from '@/modules/community/settings/member/content/member/form-member'
import {
  ButtonAdd,
  Frame,
  FrameContent,
} from '@/modules/community/settings/member/content/mini-widget'
import MemberCommunityStore from '@/store/local/member-community'
import { FollowCommunityType } from '@/types/community'
import { UserAvatar } from '@/widgets/avatar'
import { HorizontalBetweenCenterFullWidth, HorizontalFullWidth } from '@/widgets/orientation'
import { PopPover } from '@/widgets/popover'
import { Spinner } from '@/widgets/spinner'
import { TextSm } from '@/widgets/text'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

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
  flex-wrap
`

const PaddingIcon = tw.div`p-3 cursor-pointer`

const DanderTextSm = tw(TextSm)`text-danger`

const BorderBox = tw.div`py-1 px-2 text-sm border border-solid border-gray-200 rounded-lg`

const MemberItem: FC<{ member: FollowCommunityType }> = ({ member }) => {
  const renderRole = member.role.map((role, index) => (
    <BorderBox key={index}>{role.name}</BorderBox>
  ))

  return (
    <Padding>
      <HorizontalBetweenCenterFullWidth>
        <UserAvatar size={32} user={member.user} />
        <HorizontalFullWidthCenter>{member.user.name}</HorizontalFullWidthCenter>
      </HorizontalBetweenCenterFullWidth>
      <Width290>{renderRole}</Width290>
      <PopPover
        styled='right-10 top-0 w-[150px]'
        button={
          <PaddingIcon>
            <EllipsisHorizontalIcon className='w-5 h-5 text-gray-900' />
          </PaddingIcon>
        }
      >
        <PaddingIcon>
          <TextSm>{'Add Role'}</TextSm>
        </PaddingIcon>
        <PaddingIcon>
          <TextSm>{'Edit Role'}</TextSm>
        </PaddingIcon>
        <PaddingIcon>
          <DanderTextSm>{'Remove Member'}</DanderTextSm>
        </PaddingIcon>
      </PopPover>
    </Padding>
  )
}

const RenderMembers: FC<{ members: FollowCommunityType[]; loading: boolean }> = ({
  members,
  loading,
}) => {
  if (loading) {
    return <Spinner />
  }

  if (members.length === 0) {
    return <HorizontalFullWidthCenter>{'Users empty'}</HorizontalFullWidthCenter>
  }

  const renderMembers = members.map((member) => <MemberItem key={member.user.id} member={member} />)

  return <FrameContent>{renderMembers}</FrameContent>
}

const MemberContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [members, setMembers] = useState<FollowCommunityType[]>([])
  const { communityHandle } = useParams()

  const setShowModal = MemberCommunityStore.useStoreActions((action) => action.setShowModal)

  useEffect(() => {
    getUsersChat()
  }, [])

  if (!communityHandle) {
    return <></>
  }

  const getUsersChat = async () => {
    try {
      const { data, error } = await getCommunityFollowersApi(communityHandle)

      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        setMembers(data.followers)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const onAdded = () => {
    setShowModal(true)
  }

  return (
    <Frame>
      <ButtonAdd onOpenModal={onAdded} buttonName='Add Member' />
      <RenderMembers loading={loading} members={members} />
      <FormMember />
    </Frame>
  )
}

const Member: FC = () => {
  return (
    <MemberCommunityStore.Provider>
      <MemberContent />
    </MemberCommunityStore.Provider>
  )
}

export default Member
