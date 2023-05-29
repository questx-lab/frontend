import { useEffect } from 'react'

import { useStoreState } from 'easy-peasy'
import { json, Outlet, Params, useLoaderData } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getCommunityApi } from '@/app/api/client/communitiy'
import { listQuestApi } from '@/app/api/client/quest'
import { CommunityRoleEnum } from '@/constants/common.const'
import { ControlPanel } from '@/routes/communities/community/control-panel'
import { CommunityStore } from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { CollaboratorType, CommunityType, QuestType } from '@/utils/type'
import { Horizontal } from '@/widgets/orientation'

export const Loader = async (args: { params: Params }) => {
  const [communityResult, questsResult] = await Promise.all([
    getCommunityApi(args.params['communityHandle'] || ''),
    listQuestApi(args.params['communityHandle'] || '', ''),
  ])

  const community = communityResult.code === 0 ? communityResult.data?.community : undefined
  const quests = questsResult.code === 0 ? questsResult.data?.quests : undefined

  if (communityResult.code === 0) {
    return json(
      {
        community,
        quests,
      },
      { status: 200 }
    )
  }

  return {}
}

const PaddingLeft = styled(Horizontal)<{ hasPanel: boolean }>(({ hasPanel = true }) => {
  if (hasPanel) {
    return tw`
      min-h-screen
      pt-[70px]
      pl-80
    `
  }

  return tw``
})

export const Community = () => {
  // loader data
  let data = useLoaderData() as {
    community: CommunityType
    quests: QuestType[]
  }
  const community = data.community

  // data
  const myCommunities: CollaboratorType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesCollab
  )

  // action
  const setRole = CommunityStore.useStoreActions((action) => action.setRole)
  const setSelectedCommunity = CommunityStore.useStoreActions(
    (action) => action.setSelectedCommunity
  )
  const setQuests = CommunityStore.useStoreActions((action) => action.setQuests)

  // hook
  useEffect(() => {
    setSelectedCommunity(data.community)
    setQuests(data.quests || [])
  }, [setSelectedCommunity, setQuests, data.community, data.quests])

  if (!community) {
    return <>Failed to load community data</>
  }

  // Check if user is the admin of this community
  const filter = myCommunities.filter(
    (collaboration) => collaboration.community.handle === community.handle
  )
  const isOwner = filter.length > 0
  if (isOwner) {
    setRole(CommunityRoleEnum.OWNER)
  } else {
    setRole(CommunityRoleEnum.GUEST)
  }

  return (
    <>
      <ControlPanel community={community} show={isOwner} />
      <PaddingLeft hasPanel={isOwner}>
        <Outlet />
      </PaddingLeft>
    </>
  )
}
