import { FunctionComponent } from 'react'

import { useStoreActions } from 'easy-peasy'
import { Toaster } from 'react-hot-toast'
import { json, useLoaderData } from 'react-router-dom'
import tw from 'twin.macro'

import {
  getFollowCommunitiesApi,
  getMyCommunitiesApi,
  getTrendingCommunities,
} from '@/app/api/client/communitiy'
import { getMyReferralInfoApi } from '@/app/api/client/reward'
import { EnvVariables } from '@/constants/env.const'
import { Header } from '@/modules/header/header'
import { HomePage } from '@/routes'
import { GlobalStoreModel } from '@/store/store'
import { getUserLocal } from '@/utils/helper'
import { CollaboratorType, CommunityType, RefferalType } from '@/utils/type'
import { GoogleOAuthProvider } from '@react-oauth/google'

export const RootLoader = async () => {
  const localUser = getUserLocal()

  const trendingCommunitiesResult = await getTrendingCommunities()

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
        trendingCommunities: trendingCommunitiesResult.data?.communities || [],
        newCommunities: trendingCommunitiesResult.data?.communities || [],
      },
      { status: 200 }
    )
  }

  return json(
    {
      // TODO : Currently, cannot not distinguish between trending and new communities
      // Will change if api support query both of them
      trendingCommunities: trendingCommunitiesResult.data?.communities || [],
      newCommunities: trendingCommunitiesResult.data?.communities || [],
    },
    { status: 200 }
  )
}

const Main = tw.main`
  max-h-screen
  flex
  flex-col
`

const OverscrollY = tw.div`
  overflow-scroll
`

export const Root: FunctionComponent = () => {
  // props
  const data = useLoaderData() as {
    myCommunities: CollaboratorType[]
    followingCommunities: CommunityType[]
    referral: RefferalType
    trendingCommunities: CommunityType[]
    newCommunities: CommunityType[]
  }

  // action
  const setReferral = useStoreActions<GlobalStoreModel>((action) => action.setReferral)
  const setCommunitiesCollab = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesCollab
  )
  const setCommunitiesFollowing = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesFollowing
  )
  const setCommunitiesTrending = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesTrending
  )
  const setCommunitiesNew = useStoreActions<GlobalStoreModel>((action) => action.setCommunitiesNew)

  // set data
  if (data) {
    setReferral(data.referral)
    setCommunitiesCollab(data.myCommunities)
    setCommunitiesFollowing(data.followingCommunities)
    setCommunitiesTrending(data.trendingCommunities)
    setCommunitiesNew(data.newCommunities)
  }

  return (
    <GoogleOAuthProvider clientId={EnvVariables.GOOGLE_ID}>
      <Main>
        <OverscrollY>
          <HomePage />
        </OverscrollY>
        <Header />
      </Main>
      <Toaster position='top-center' reverseOrder={false} />
    </GoogleOAuthProvider>
  )
}
