import { FC } from 'react'

import { json, useLoaderData } from 'react-router-dom'

import AdminLogin from '@/admin-portal/modules/login'
import Portal from '@/admin-portal/modules/portal'
import { getUserApi } from '@/api/user'
import { CommunityRoleEnum } from '@/constants/common.const'
import AdminPortalStore from '@/store/admin/admin-portal'
import { UserType } from '@/types'
import { getUserLocal } from '@/utils/helper'

export const RootLoader = async () => {
  const localUser = getUserLocal()
  if (localUser) {
    // User has logged in. We load following communities & follower communities.
    const userResult = await getUserApi()

    return json(
      {
        user: userResult.data || undefined,
      },
      { status: 200 }
    )
  }

  return {}
}

const Root: FC = () => {
  const data = useLoaderData() as {
    user: UserType
  }

  if (!data.user) {
    return <AdminLogin />
  }

  if (
    data.user.role !== CommunityRoleEnum.ADMIN &&
    data.user.role !== CommunityRoleEnum.SUPER_ADMIN
  ) {
    return <AdminLogin />
  }

  return (
    <AdminPortalStore.Provider>
      <Portal />
    </AdminPortalStore.Provider>
  )
}

export default Root
