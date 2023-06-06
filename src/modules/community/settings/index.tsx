import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'

import General from '@/modules/community/settings/general'
import CommunityStore from '@/store/local/community'
import NewCommunityStore from '@/store/local/new-community'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Tab, TabItem } from '@/widgets/tab-group'
import { HeaderText3 } from '@/widgets/text'

enum TabEnum {
  GENERAL,
  API,
}

const HeaderText = tw(HeaderText3)`
  w-full
  max-2xl:px-12
  max-lg:px-6
  py-4
  px-36
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
    <VerticalFullWidth>
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
          {
            // TODO: complete API key tab.
            /* <TabItem active={tab === TabEnum.API} onClick={() => setTab(TabEnum.API)}>
            {'API KEY'}
          </TabItem> */
          }
        </Tab>
      </HorizontalBetweenCenterFullWidth>
      <Gap height={6} />
      {tab === TabEnum.GENERAL && <General />}
    </VerticalFullWidth>
  )
}

export default CommunitySettings
