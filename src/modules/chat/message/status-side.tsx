import { FC, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getUsersApi } from '@/api/chat'
import { UserChatStatusType, UserChatType } from '@/types/chat'
import { UserAvatar } from '@/widgets/avatar'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  Vertical,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { SmallSpinner } from '@/widgets/spinner'
import { TextSm } from '@/widgets/text'

const Frame = tw(Vertical)`
  w-[230px]
  fixed
  p-6
  border-l
  border-gray-200
  border-solid
  right-0
  h-full
  overflow-y-scroll
  gap-3
`

const StatusFrame = tw(Vertical)`
  w-full
  h-full
  gap-3
`

const NameUser = styled.div<{ status: UserChatStatusType }>(({ status }) => {
  const styles = [tw`text-sm font-medium`]
  if (status === UserChatStatusType.OFFLINE) {
    styles.push(tw`text-gray-400`)
  } else {
    styles.push(tw`text-gray-900`)
  }

  return styles
})

const StatusDescriptionUser = styled.div<{ status: UserChatStatusType }>(({ status }) => {
  const styles = [tw`text-xs font-normal`]
  if (status === UserChatStatusType.OFFLINE) {
    styles.push(tw`text-gray-300`)
  } else {
    styles.push(tw`text-gray-700`)
  }

  return styles
})

const GapHorizontal = tw(HorizontalFullWidth)`gap-3 items-center cursor-pointer`
const GapVertical = tw(VerticalFullWidth)`gap-1 justify-center`

const FullSize = tw(HorizontalBetweenCenterFullWidth)`h-full`

const UserItem: FC<{ user: UserChatType }> = ({ user }) => {
  return (
    <GapHorizontal>
      <UserAvatar user={user.user} size={32} />
      <GapVertical>
        <NameUser status={user.status}>{user.user.name}</NameUser>
        <StatusDescriptionUser status={user.status}>{user.shordStatus}</StatusDescriptionUser>
      </GapVertical>
    </GapHorizontal>
  )
}

const UsersChat: FC<{ users: UserChatType[]; loading: boolean }> = ({ users, loading }) => {
  if (loading) {
    return (
      <FullSize>
        <SmallSpinner />
      </FullSize>
    )
  }
  if (users.length === 0) {
    return <></>
  }

  const renderUsers = users.map((user, index) => <UserItem key={index} user={user} />)

  return <>{renderUsers}</>
}

const StatusSide: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [usersChat, setUsersChat] = useState<UserChatType[]>([])

  useEffect(() => {
    getUsersChat()
  }, [])

  const getUsersChat = async () => {
    try {
      const { error, data } = await getUsersApi()
      if (error) {
        toast.error(error)
      }

      if (data) {
        setUsersChat(data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const onlineUsers = usersChat.filter((user) => user.status !== UserChatStatusType.OFFLINE)
  const offlineUsers = usersChat.filter((user) => user.status === UserChatStatusType.OFFLINE)

  return (
    <Frame>
      <StatusFrame>
        <TextSm>{'ONLINE'}</TextSm>
        <UsersChat users={onlineUsers} loading={loading} />
      </StatusFrame>
      <StatusFrame>
        <TextSm>{'OFFINE'}</TextSm>
        <UsersChat users={offlineUsers} loading={loading} />
      </StatusFrame>
    </Frame>
  )
}

export default StatusSide
