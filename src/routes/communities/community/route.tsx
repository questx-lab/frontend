import { useEffect } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { json, Outlet, Params, useLoaderData } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getCommunityApi } from '@/app/api/client/communitiy'
import { getTemplatesApi, listQuestApi } from '@/app/api/client/quest'
import { CommunityRoleEnum } from '@/constants/common.const'
import { ControlPanel } from '@/modules/community/control-panel'
import { CommunityStore } from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { CollaboratorType, CommunityType, QuestType } from '@/utils/type'
import { Horizontal } from '@/widgets/orientation'

export const Loader = async (args: { params: Params }) => {
  const [communityResult, templatesResult] = await Promise.all([
    getCommunityApi(args.params['communityHandle'] || ''),
    getTemplatesApi(),
  ])

  const community = communityResult.code === 0 ? communityResult.data?.community : undefined
  const templates = templatesResult.code === 0 ? templatesResult.data?.templates : []

  if (communityResult.code === 0) {
    return json(
      {
        community,
        templates,
      },
      { status: 200 }
    )
  }

  return {}
}

const PaddingLeft = styled(Horizontal)<{ hasPanel: boolean }>(({ hasPanel = true }) => {
  if (hasPanel) {
    return tw`
      pl-80
    `
  }

  return tw``
})

export const Community = () => {
  // TODO: handle load failure here.
  // loader data
  let data = useLoaderData() as {
    community: CommunityType
    templates: QuestType[]
  }
  const community = data.community

  // data
  const myCommunities: CollaboratorType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesCollab
  )
  // Check if user is the admin of this community
  const filter =
    myCommunities &&
    myCommunities.filter((collaboration) => collaboration.community.handle === community.handle)

  const isOwner = filter && filter.length > 0

  // action
  const setRole = CommunityStore.useStoreActions((action) => action.setRole)
  const setSelectedCommunity = CommunityStore.useStoreActions(
    (action) => action.setSelectedCommunity
  )
  const setQuests = CommunityStore.useStoreActions((action) => action.setQuests)
  const setTemplates = useStoreActions<GlobalStoreModel>((action) => action.setTemplates)

  // hook
  useEffect(() => {
    console.log('Setting selected community = ', data.community)
    setSelectedCommunity(data.community)
    loadQuests()

    if (isOwner) {
      setRole(CommunityRoleEnum.OWNER)
      setTemplates(data.templates)
    } else {
      setRole(CommunityRoleEnum.GUEST)
    }
  }, [setSelectedCommunity, data.community, isOwner, data.templates])

  if (!community) {
    return <>Failed to load community data</>
  }

  // load quests
  const loadQuests = async () => {
    const result = await listQuestApi(community.handle, '')
    if (result.code === 0) {
      setQuests(result.data?.quests || [])
    } else {
      // TODO: show error loading quest here.
    }
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
