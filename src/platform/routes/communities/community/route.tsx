import { useEffect } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { json, Outlet, Params, useLoaderData } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getCommunityApi } from '@/api/communitiy'
import { getTemplatesApi, listQuestApi } from '@/api/quest'
import { CommunityRoleEnum } from '@/constants/common.const'
import { ControlPanel } from '@/modules/community/control-panel'
import ActiveQuestStore from '@/store/local/active-quest'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { CollaboratorType } from '@/types'
import { CommunityType } from '@/types/community'
import { QuestType } from '@/types/quest'
import { Horizontal, HorizontalCenter } from '@/widgets/orientation'

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

const Community = () => {
  // TODO: handle load failure here.
  // loader data
  let data = useLoaderData() as {
    community: CommunityType
    templates: QuestType[]
  }

  // data
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const myCommunities = useStoreState<GlobalStoreModel>((state) => state.communitiesCollab)
  const deletedQuestId = ActiveQuestStore.useStoreState((state) => state.deletedQuestId)
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const canEdit = CommunityStore.useStoreState((state) => state.canEdit)
  const showPanel: boolean = canEdit && user

  // Check if user is the editor of this community
  let collab: CollaboratorType | undefined = undefined
  if (myCommunities) {
    for (let communityCollab of myCommunities) {
      if (communityCollab.community.handle === community.handle) {
        collab = communityCollab
        break
      }
    }
  }

  // action
  const setRole = CommunityStore.useStoreActions((action) => action.setRole)
  const setSelectedCommunity = CommunityStore.useStoreActions(
    (action) => action.setSelectedCommunity
  )
  const setQuests = CommunityStore.useStoreActions((action) => action.setQuests)
  const setTemplates = useStoreActions<GlobalStoreModel>((action) => action.setTemplates)

  // load quests
  const loadQuests = async () => {
    if (data.community && data.community.handle) {
      const result = await listQuestApi(data.community.handle, '', true)
      if (result.code === 0) {
        setQuests(result.data?.quests || [])
      } else {
        // TODO: show error loading quest here.
      }
    }
  }

  // hook
  useEffect(() => {
    setSelectedCommunity(data.community)
    if (collab) {
      switch (collab.name) {
        case CommunityRoleEnum.OWNER:
        case CommunityRoleEnum.EDITOR:
          setRole(collab.name)
          setTemplates(data.templates)
          break
      }
    } else {
      if (user) {
        setRole(CommunityRoleEnum.GUEST)
      } else {
        setRole(CommunityRoleEnum.NOT_LOGIN)
      }
    }
  }, [data.community, collab, data])

  useEffect(() => {
    // Reload all the quests whenever data community changes or a new quest is deleted.
    loadQuests()
  }, [deletedQuestId, data.community])

  if (!community) {
    return <HorizontalCenter>{'Failed to load community data'}</HorizontalCenter>
  }

  return (
    <>
      <ControlPanel community={community} show={showPanel} />
      <PaddingLeft hasPanel={showPanel}>
        <Outlet />
      </PaddingLeft>
    </>
  )
}

export default Community
