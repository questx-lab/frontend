import { FC, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { getUsersApi } from '@/api/chat'
import AddMember from '@/modules/community/settings/chat/content/member/add-member'
import { UserChatType } from '@/types/chat'
import { UserAvatar } from '@/widgets/avatar'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  HorizontalFullWidth,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { PopPover } from '@/widgets/popover'
import { Spinner } from '@/widgets/spinner'
import { TextSm } from '@/widgets/text'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

const Frame = tw(VerticalFullWidth)`
  h-full
  overflow-y-scroll
  gap-3
`

const Padding = tw(HorizontalBetweenCenterFullWidth)`
  py-3
  px-6
  gap-3
  rounded-lg
  bg-primary-50
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
  text-sm
`

const PaddingIcon = tw.div`p-3 cursor-pointer`

const MemberItem: FC<{ member: UserChatType }> = ({ member }) => {
  return (
    <Padding>
      <HorizontalCenter>
        <UserAvatar size={32} user={member.user} />
        <Width480>{member.user.name}</Width480>
      </HorizontalCenter>
      <Width100>{member.role}</Width100>
      <PopPover
        styled='right-10 top-0 w-[150px]'
        button={
          <PaddingIcon>
            <EllipsisHorizontalIcon className='w-5 h-5 text-gray-900' />
          </PaddingIcon>
        }
      >
        <PaddingIcon>
          <TextSm>{'Change Role'}</TextSm>
        </PaddingIcon>
        <PaddingIcon>
          <TextSm>{'Remove Member'}</TextSm>
        </PaddingIcon>
      </PopPover>
    </Padding>
  )
}

const RenderMembers: FC<{ members: UserChatType[]; loading: boolean }> = ({ members, loading }) => {
  if (loading) {
    return <Spinner />
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
