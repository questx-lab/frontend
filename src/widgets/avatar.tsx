import { FC } from 'react'

import StorageConst from '@/constants/storage.const'
import { UserType } from '@/types'
import { CircularImage } from '@/widgets/circular-image'
import Identicon from '@/widgets/identicon'

export const UserAvatar: FC<{ size: number; user: UserType | undefined }> = ({ size, user }) => {
  if (!user) {
    return (
      <CircularImage
        width={size}
        height={size}
        src={StorageConst.USER_DEFAULT.src}
        alt={'Avatar'}
      />
    )
  }

  if (!user.avatar_url) {
    return Identicon({ value: user.id, size })
  }

  return <CircularImage width={size} height={size} src={user.avatar_url} alt={'Avatar'} />
}
