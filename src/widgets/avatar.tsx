import { FC } from 'react'

import { UserType } from '@/types'
import { CircularImage } from '@/widgets/circular-image'
import Identicon from '@/widgets/identicon'

export const UserAvatar: FC<{ size: number; user: UserType }> = ({ size, user }) => {
  if (!user.avatar_url) {
    return Identicon({ value: user.id, size })
  }

  return <CircularImage width={size} height={size} src={user.avatar_url} alt={'Avatar'} />
}
