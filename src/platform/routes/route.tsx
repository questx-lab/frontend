import { FC, useEffect } from 'react'

import { useStoreActions } from 'easy-peasy'
import { json, useLoaderData } from 'react-router-dom'
import tw from 'twin.macro'

import { getFollowCommunitiesApi, getMyCommunitiesApi } from '@/api/communitiy'
import { getMyReferralInfoApi } from '@/api/reward'
import { getUserApi } from '@/api/user'
import { Header } from '@/modules/header'
import { HomePage } from '@/platform/routes'
import ChatStore from '@/store/chat/chat'
import ActiveQuestStore from '@/store/local/active-quest'
import CommunityStore from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest'
import { GlobalStoreModel } from '@/store/store'
import { CollaboratorType, RefferalType, UserType } from '@/types'
import { CommunityType } from '@/types/community'
import { getUserLocal } from '@/utils/helper'

export const RootLoader = async () => {
  const localUser = getUserLocal()

  if (localUser) {
    // User has logged in. We load following communities & follower communities.
    const myCommunitiesResult = await getMyCommunitiesApi()
    const followingCommunitiesResult = await getFollowCommunitiesApi()
    const referralResult = await getMyReferralInfoApi()
    const userResult = await getUserApi()

    return json(
      {
        myCommunities: myCommunitiesResult.data?.collaborators || [],
        followingCommunities: followingCommunitiesResult.data?.followers || [],
        referral: referralResult.data || undefined,
        user: userResult.data || undefined,
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

const OverscrollY = tw.div`
  overflow-scroll
`

const Root: FC = () => {
  // props
  const data = useLoaderData() as {
    myCommunities: CollaboratorType[]
    followingCommunities: CommunityType[]
    referral: RefferalType
    user: UserType
  }

  // action
  const setReferral = useStoreActions<GlobalStoreModel>((action) => action.setReferral)
  const setCommunitiesCollab = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesCollab
  )
  const setCommunitiesFollowing = useStoreActions<GlobalStoreModel>(
    (action) => action.setCommunitiesFollowing
  )
  const setUser = useStoreActions<GlobalStoreModel>((action) => action.setUser)

  useEffect(() => {
    // set data
    if (data.user) {
      setReferral(data.referral)
      setCommunitiesCollab(data.myCommunities)
      setCommunitiesFollowing(data.followingCommunities)
      setUser(data.user)
    }
  }, [data, data.user])

  return (
    <Main>
      <CommunityStore.Provider>
        <NewQuestStore.Provider>
          <ActiveQuestStore.Provider>
            <ChatStore.Provider>
              <OverscrollY>
                <HomePage />
              </OverscrollY>
              <Header />
            </ChatStore.Provider>
          </ActiveQuestStore.Provider>
        </NewQuestStore.Provider>
      </CommunityStore.Provider>
    </Main>
  )
}

export default Root
