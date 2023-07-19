import { FC, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { getUsersApi } from '@/api/chat'
import AddMember from '@/modules/community/settings/chat/content/member/add-member'
import { UserChatType } from '@/types/chat'
import { UserAvatar } from '@/widgets/avatar'
import { HorizontalFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { Spinner } from '@/widgets/spinner'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

const Frame = tw(VerticalFullWidth)`
  h-full
  overflow-y-scroll
  gap-3
`

const Padding = tw(HorizontalFullWidth)`
  py-3
  px-6
  gap-3
`

const Width480 = tw(HorizontalFullWidth)`
  w-[480px]
  items-center
  h-full
`

const Width100 = tw(HorizontalFullWidth)`
  w-[100px]
  items-center
  h-full
`

const PaddingIcon = tw.div`p-3 cursor-pointer`

const MemberItem: FC<{ member: UserChatType }> = ({ member }) => {
  return (
    <Padding>
      <UserAvatar size={32} user={member.user} />
      <Width480>{member.user.name}</Width480>
      <Width100>{member.role}</Width100>
      <PaddingIcon>
        <EllipsisHorizontalIcon className='w-5 h-5 text-gray-900' />
      </PaddingIcon>
    </Padding>
  )
}

const RenderMembers: FC<{ members: UserChatType[]; loading: boolean }> = ({ members, loading }) => {
  if (loading) {
    ;<Spinner />
  }

  if (members.length === 0) {
    return <HorizontalFullWidthCenter>{'Users empty'}</HorizontalFullWidthCenter>
  }

  const renderMembers = members.map((member) => <MemberItem key={member.user.id} member={member} />)

  return <Frame>{renderMembers}</Frame>
}

const Member: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [members, setMembers] = useState<UserChatType[]>([])

  useEffect(() => {
    getUsersChat()
  }, [])

  const getUsersChat = async () => {
    try {
      const { data, error } = await getUsersApi()

      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        setMembers(data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <Frame>
      <AddMember />
      <RenderMembers loading={loading} members={members} />
    </Frame>
  )
}

export default Member
