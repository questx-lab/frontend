import { FC, useEffect, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import chatController from '@/modules/chat/services/chat-controller'
import CommunityStore from '@/store/local/community'
import { UserType } from '@/types'
import { UserChatStatusType } from '@/types/chat'
import { UserAvatar } from '@/widgets/avatar'
import { HorizontalFullWidth, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { TextSm } from '@/widgets/text'

const Frame = tw(Vertical)`
  w-[300px]
  fixed
  p-6
  mt-[64px]
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

const UserItem: FC<{ user: UserType }> = ({ user }) => {
  return (
    <GapHorizontal>
      <UserAvatar user={user} size={32} />
      <GapVertical>
        <NameUser status={user.status || UserChatStatusType.OFFLINE}>{user.name}</NameUser>
        <StatusDescriptionUser status={user.status || UserChatStatusType.OFFLINE}>
          {''}
        </StatusDescriptionUser>
      </GapVertical>
    </GapHorizontal>
  )
}

const UsersChat: FC<{ users: UserType[] }> = ({ users }) => {
  if (users.length === 0) {
    return <></>
  }

  const renderUsers = users.map((user, index) => <UserItem key={index} user={user} />)

  return <>{renderUsers}</>
}

const StatusSide: FC = () => {
  const community = CommunityStore.useStoreState((action) => action.selectedCommunity)
  const [usersChat, setUsersChat] = useState<UserType[]>([])

  useEffect(() => {
    if (community.handle === '') {
      return
    }

    setUsersChat(chatController.getOnlineUsers(community.handle))
  }, [community.handle])

  useEffect(() => {
    const listener = {
      onStatusChanged: (communityHandle: string, onlineUsers: UserType[]) => {
        if (community.handle !== communityHandle) {
          return
        }

        setUsersChat(onlineUsers)
      },
    }

    chatController.addChatStatusListener(listener)

    return () => {
      chatController.removeChatStatusListener(listener)
    }
  }, [community.handle])

  return (
    <Frame>
      <StatusFrame>
        <TextSm>{'ONLINE'}</TextSm>
        <UsersChat users={usersChat} />
      </StatusFrame>
    </Frame>
  )
}

export default StatusSide
