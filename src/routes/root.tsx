import { GoogleOAuthProvider } from '@react-oauth/google'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { FunctionComponent } from 'react'
import { Toaster } from 'react-hot-toast'
import { json, useLoaderData } from 'react-router-dom'
import tw from 'twin.macro'

import { getFollowCommunitiesApi, getMyCommunitiesApi } from '@/app/api/client/communitiy'
import { getMyReferralInfoApi } from '@/app/api/client/reward'
import { EnvVariables } from '@/constants/env.const'
import { Header } from '@/modules/header/header'
import Login from '@/modules/header/login'
import { HomeOrLandingPage } from '@/modules/root'
import { GlobalStoreModel } from '@/store/store'
import { getUserLocal } from '@/utils/helper'
import { CollaboratorType, CommunityType, RefferalType } from '@/utils/type'
import { BasicModal } from '@/widgets/modal'

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

  return null
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

  // data
  const showLoginModal = useStoreState<GlobalStoreModel>((state) => state.showLoginModal)

  // action
  const setShowLoginModal = useStoreActions<GlobalStoreModel>((action) => action.setShowLoginModal)
  const setReferral = useStoreActions<GlobalStoreModel>((action) => action.setReferral)
  const setProjectCollab = useStoreActions<GlobalStoreModel>((action) => action.setProjectCollab)
  const setProjectsFollowing = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectsFollowing
  )

  // set data
  if (data) {
    setReferral(data.referral)
    setProjectCollab(data.myCommunities)
    setProjectsFollowing(data.followingCommunities)
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
      <BasicModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Login setOpen={setShowLoginModal} />
      </BasicModal>
    </GoogleOAuthProvider>
  )
}
