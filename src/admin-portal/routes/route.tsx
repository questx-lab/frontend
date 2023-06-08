import { FC } from 'react'

import { json, useLoaderData } from 'react-router-dom'

import AdminLogin from '@/admin-portal/modules/login'
import { getUserApi } from '@/api/user'
import { EnvVariables } from '@/constants/env.const'
import { UserType } from '@/types'
import { getUserLocal } from '@/utils/helper'
import { GoogleOAuthProvider } from '@react-oauth/google'

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

const PortalOrLogin: FC = () => {
  return <></>
}

const Root: FC = () => {
  const data = useLoaderData() as {
    user: UserType
  }

  // if (!data.user) {
  if (true) {
    return <AdminLogin />
  }

  return (
    <GoogleOAuthProvider clientId={EnvVariables.GOOGLE_ID}>
      <PortalOrLogin />
    </GoogleOAuthProvider>
  )
}

export default Root
