'use client'

import { useState } from 'react'

import { Layout } from '@/components/layout'
import UserProfileTab from '@/modules/users/user-profile'
import { Tab, TabSide, Text, Wrap } from '@/styles/user.style'

export default function UserSetting({
  params,
}: {
  params: { userId: string }
}) {
  const [tabActive, setTabActive] = useState<number>(0)

  const onChanageTab = (tabNum: number) => {
    if (tabActive !== tabNum) {
      setTabActive(tabNum)
    }
  }

  return (
    <Layout>
      <header>
        <title>{'Profile'}</title>
      </header>
      <Wrap>
        <TabSide>
          <Tab isActive={!tabActive} onClick={() => onChanageTab(0)}>
            <Text isActive={!tabActive}>{'User Profile'}</Text>
          </Tab>
          <Tab isActive={tabActive === 1} onClick={() => onChanageTab(1)}>
            <Text isActive={tabActive === 1}>{'Account Settings'}</Text>
          </Tab>
        </TabSide>
        {tabActive === 0 && <UserProfileTab userId={params.userId} />}
      </Wrap>
    </Layout>
  )
}
