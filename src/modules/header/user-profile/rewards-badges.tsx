import { FC, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import tw from 'twin.macro'

import ClaimHistory from '@/modules/header/user-profile/claim-history'
import NFT from '@/modules/header/user-profile/nft'
import { GlobalStoreModel } from '@/store/store'
import { UserType } from '@/types'
import { Vertical } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Tab, TabItem } from '@/widgets/tab-group/focus-light-primary'

enum TabType {
  HISTORY = 'HISTORY',
  NFT = 'NFT',
}

const tabList = [TabType.NFT, TabType.HISTORY]

const BoundingBox = tw(Vertical)`
  w-2/3
  flex
  flex-col
  max-sm:w-full
`

const ControlTabs: FC<{ activeTab: TabType; setActiveTab: (activeTab: TabType) => void }> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <Tab>
      {tabList.map((tab, idx) => (
        <>
          <TabItem
            active={tab === activeTab}
            tabCount={tabList.length}
            position={idx}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </TabItem>
        </>
      ))}
    </Tab>
  )
}

const RewardsBadges: FC<{ user: UserType }> = ({ user }) => {
  // TODO: Add badges and ranking
  const me: UserType = useStoreState<GlobalStoreModel>((state) => state.user)
  const [activeTab, setActiveTab] = useState<TabType>(TabType.HISTORY)

  if (user.id !== me.id) {
    return <></>
  }

  const Panel = () => {
    switch (activeTab) {
      case TabType.HISTORY:
        return <ClaimHistory user={user} />
      case TabType.NFT:
        return <NFT user={user} />
      default:
        return <div className='w-full text-center'> We are developing </div>
    }
  }

  return (
    <BoundingBox>
      <ControlTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Gap height={5} />
      <Panel />
    </BoundingBox>
  )
}

export default RewardsBadges
