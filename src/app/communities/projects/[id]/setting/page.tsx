'use client'

import { Layout } from '@/components/layout'
import SettingCommunity from '@/modules/project/setting-community'
import { CommunityStore } from '@/store/local/community.store'

export default function Setting(props: { params: { id: string } }) {
  return (
    <Layout>
      <header>
        <title>{'Setting'}</title>
      </header>
      <CommunityStore.Provider>
        <SettingCommunity projectId={props.params.id} />
      </CommunityStore.Provider>
    </Layout>
  )
}
