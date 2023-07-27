import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'

import ChatSetting from '@/modules/community/settings/chat'
import General from '@/modules/community/settings/general'
import MemberSetting from '@/modules/community/settings/member'
import CommunityStore from '@/store/local/community'
import NewCommunityStore from '@/store/local/new-community'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { Tab, TabItem } from '@/widgets/tab-group/focus-white-background'
import { HeaderText3 } from '@/widgets/text'

enum TabEnum {
  GENERAL,
  API,
  MEMBER,
  CHAT,
}

const HeaderText = tw(HeaderText3)`
  w-full
  max-2xl:px-12
  max-lg:px-6
  py-4
  px-36
`

const Frame = tw(VerticalFullWidth)`
  h-[calc(100vh_-_64px)]
  
`

const CommunitySettings: FC = () => {
  // data
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  // actoin
  const setNewCommunity = NewCommunityStore.useStoreActions((action) => action.setCommunity)

  const [tab, setTab] = useState<TabEnum>(TabEnum.GENERAL)

  useEffect(() => {
    setNewCommunity(community)
  }, [])

  return (
    <Frame>
      <HeaderText>{'Settings'}</HeaderText>
      <HorizontalBetweenCenterFullWidth>
        <Tab>
          <TabItem
            active={tab === TabEnum.GENERAL}
            onClick={() => setTab(TabEnum.GENERAL)}
            tabCount={1}
          >
            {'GENERAL'}
          </TabItem>
          <TabItem
            tabCount={1}
            active={tab === TabEnum.MEMBER}
            onClick={() => setTab(TabEnum.MEMBER)}
          >
            {'MEMBER'}
          </TabItem>
          <TabItem tabCount={1} active={tab === TabEnum.CHAT} onClick={() => setTab(TabEnum.CHAT)}>
            {'CHAT'}
          </TabItem>
        </Tab>
      </HorizontalBetweenCenterFullWidth>
      {tab === TabEnum.GENERAL && <General />}
      {tab === TabEnum.MEMBER && <MemberSetting />}
      {tab === TabEnum.CHAT && <ChatSetting />}
    </Frame>
  )
}

export default CommunitySettings
