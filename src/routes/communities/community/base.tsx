import { getCommunityApi } from '@/app/api/client/communitiy'
import { CommunityRoleEnum } from '@/constants/common.const'
import { ControlPanel } from '@/modules/community/control-panel'
import { CommunityStore } from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { ControlPanelTab } from '@/types/community'
import { CollaboratorType, CommunityType } from '@/utils/type'
import { Horizontal } from '@/widgets/orientation'
import { useStoreState } from 'easy-peasy'
import { useEffect } from 'react'
import { json, Outlet, Params, useLoaderData } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Loader = async (args: { params: Params }) => {
  const communityResult = await getCommunityApi(args.params['communityId'] || '')
  if (communityResult.code === 0) {
    return json(
      {
        community: communityResult.data?.community,
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
  }
  const community = data.community

  // data
  const myCommunities: CollaboratorType[] = useStoreState<GlobalStoreModel>(
    (state) => state.projectCollab
  )

  // action
  const setRole = CommunityStore.useStoreActions((action) => action.setRole)
  const setSelectedCommunity = CommunityStore.useStoreActions(
    (action) => action.setSelectedCommunity
  )
  const setActiveControlPanelTab = CommunityStore.useStoreActions(
    (action) => action.setActiveControlPanelTab
  )

  // hook
  useEffect(() => {
    setSelectedCommunity(data.community)
  }, [setSelectedCommunity, data.community])

  if (!community) {
    return <>Failed to load community data</>
  }

  setActiveControlPanelTab(ControlPanelTab.QUESTS)

  // Check if user is the admin of this community
  const filter = myCommunities.filter((e) => e.community_id === community.id)
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
