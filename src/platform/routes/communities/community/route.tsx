import { useEffect } from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { BrowserView } from 'react-device-detect'
import { json, Outlet, Params, useLoaderData } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getCategoriesApi, getCommunityApi } from '@/api/communitiy'
import { getTemplatesApi, listQuestApi } from '@/api/quest'
import { CommunityRoleEnum } from '@/constants/common.const'
import ControlPanel from '@/modules/community/control-panel'
import useDeleteQuest from '@/platform/hooks/use-delete-quest'
import CommunityStore from '@/store/local/community'
import { GlobalStoreModel } from '@/store/store'
import { CategoryType } from '@/types'
import { CommunityType } from '@/types/community'
import { QuestType } from '@/types/quest'
import { Horizontal, HorizontalCenter } from '@/widgets/orientation'

export const Loader = async (args: { params: Params }) => {
  const [communityResult, templatesResult, categoriesResult] = await Promise.all([
    getCommunityApi(args.params['communityHandle'] || ''),
    getTemplatesApi(),
    getCategoriesApi(args.params['communityHandle'] || ''),
  ])

  const community = communityResult.code === 0 ? communityResult.data?.community : undefined
  const templates = templatesResult.code === 0 ? templatesResult.data?.templates : []
  const categories = categoriesResult.code === 0 ? categoriesResult.data?.categories : []

  if (communityResult.code === 0) {
    return json(
      {
        community,
        templates,
        categories,
      },
      { status: 200 }
    )
  }

  return {}
}

const PaddingLeft = styled(Horizontal)<{ hasPanel: boolean }>(({ hasPanel = true }) => {
  if (hasPanel) {
    return tw`
      pl-60
      max-md:pl-0
    `
  }

  return tw``
})

const TopEvent = styled.div<{ hasEvent: boolean }>(({ hasEvent }) => {
  const styles = [tw``]
  if (hasEvent) {
    styles.push(tw`mt-[48px]`)
  }

  return styles
})

const Community = () => {
  // TODO: handle load failure here.
  // loader data
  let data = useLoaderData() as {
    community: CommunityType
    templates: QuestType[]
    categories: CategoryType[]
  }

  // data
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const myCommunities: CommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.myCommunities
  )
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const hasEvent = useStoreState<GlobalStoreModel>((state) => state.hasEvent)
  const canEdit = CommunityStore.useStoreState((state) => state.canEdit)
  const showPanel: boolean = canEdit && user
  const deletedQuest = useDeleteQuest()

  // Check if user is the editor of this community
  let collab: CommunityType | undefined = undefined
  if (myCommunities) {
    for (let communityCollab of myCommunities) {
      if (community && communityCollab.handle === community.handle) {
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
  const setCategories = CommunityStore.useStoreActions((action) => action.setCategories)

  // load quests
  const loadQuests = async () => {
    if (data.community && data.community.handle) {
      const includeUnclaimAble = user ? true : false
      const result = await listQuestApi(data.community.handle, '', includeUnclaimAble)
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
    setCategories(data.categories)
    if (collab) {
      setRole(CommunityRoleEnum.OWNER)
      setTemplates(data.templates)
    } else {
      if (user) {
        setRole(CommunityRoleEnum.GUEST)
      } else {
        setRole(CommunityRoleEnum.NOT_LOGIN)
      }
    }
  }, [collab, data])

  useEffect(() => {
    // Reload all the quests whenever data community changes or a new quest is deleted.
    loadQuests()
  }, [deletedQuest.id, data.community])

  if (!community) {
    return <HorizontalCenter>{'Failed to load community data'}</HorizontalCenter>
  }

  return (
    <TopEvent hasEvent={hasEvent}>
      <BrowserView>
        <ControlPanel community={community} show={showPanel} />
      </BrowserView>
      <PaddingLeft hasPanel={showPanel}>
        <Outlet />
      </PaddingLeft>
    </TopEvent>
  )
}

export default Community
