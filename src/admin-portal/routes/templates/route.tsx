import { FC, useEffect } from 'react'

import { useStoreActions } from 'easy-peasy'
import { json, Outlet, Params, useLoaderData } from 'react-router'

import { ControlPanelTab } from '@/admin-portal/types/control-panel-tab'
import { getTemplatesApi } from '@/api/quest'
import AdminPortalStore from '@/store/admin/portal'
import ActiveQuestStore from '@/store/local/active-quest'
import CommunityStore from '@/store/local/community'
import NewQuestStore from '@/store/local/new-quest'
import { GlobalStoreModel } from '@/store/store'
import { QuestType } from '@/types/quest'

export const Loader = async (args: { params: Params }) => {
  const [templatesResult] = await Promise.all([getTemplatesApi()])
  const templates = templatesResult.code === 0 ? templatesResult.data?.templates : []
  if (templatesResult.code === 0) {
    return json(
      {
        templates,
      },
      { status: 200 }
    )
  }

  return {}
}

const Templates: FC = () => {
  let data = useLoaderData() as {
    templates: QuestType[]
  }

  const setTab = AdminPortalStore.useStoreActions((action) => action.setTab)
  const setTemplates = useStoreActions<GlobalStoreModel>((action) => action.setTemplates)

  useEffect(() => {
    setTab(ControlPanelTab.TEMPLATES)
    if (data.templates) {
      setTemplates(data.templates)
    }
  }, [data.templates])

  return (
    <ActiveQuestStore.Provider>
      <CommunityStore.Provider>
        <NewQuestStore.Provider>
          <Outlet />
        </NewQuestStore.Provider>
      </CommunityStore.Provider>
    </ActiveQuestStore.Provider>
  )
}

export default Templates
