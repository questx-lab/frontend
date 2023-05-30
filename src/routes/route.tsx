import { FunctionComponent } from 'react'

import { useStoreActions } from 'easy-peasy'
import { Toaster } from 'react-hot-toast'
import { json, useLoaderData } from 'react-router-dom'
import tw from 'twin.macro'

import { getFollowCommunitiesApi, getMyCommunitiesApi } from '@/app/api/client/communitiy'
import { getMyReferralInfoApi } from '@/app/api/client/reward'
import { EnvVariables } from '@/constants/env.const'
import { Header } from '@/modules/header/header'
import { HomeOrLandingPage } from '@/routes'
import { GlobalStoreModel } from '@/store/store'
import { getUserLocal } from '@/utils/helper'
import { CollaboratorType, CommunityType, RefferalType } from '@/utils/type'
import { GoogleOAuthProvider } from '@react-oauth/google'

export const RootLoader = async () => {
  const localUser = getUserLocal()

  if (localUser) {
    // User has logged in. We load following communities & follower communities.
    const myCommunitiesResult = await getMyCommunitiesApi()
    const followingCommunitiesResult = await getFollowCommunitiesApi()
    const referralResult = await getMyReferralInfoApi()

    return json(
      {
        myCommunities: myCommunitiesResult.data?.collaborators || [],
        followingCommunities: followingCommunitiesResult.data?.communities || [],
        referral: referralResult.data || undefined,
      },
      { status: 200 }
    )
  }

  return {}
}

const Main = tw.main`
  max-h-screen
  flex
  flex-col
`

export const Root: FunctionComponent = () => {
  // props
  const data = useLoaderData() as {
    myCommunities: CollaboratorType[]
    followingCommunities: CommunityType[]
    referral: RefferalType
  }

  // action
  const setReferral = useStoreActions<GlobalStoreModel>((action) => action.setReferral)
  const setCommunitiesCollab = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesCollab
  )
  const setCommunitiesFollowing = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesFollowing
  )

  // set data
  if (data) {
    setReferral(data.referral)
    setCommunitiesCollab(data.myCommunities)
    setCommunitiesFollowing(data.followingCommunities)
  }

  return (
    <GoogleOAuthProvider clientId={EnvVariables.GOOGLE_ID}>
      <Main>
        <div className='overflow-scroll'>
          <HomeOrLandingPage />
        </div>
        <Header />
      </Main>
      <Toaster position='top-center' reverseOrder={false} />
    </GoogleOAuthProvider>
  )
}
