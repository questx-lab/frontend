import { FC } from 'react'

import tw from 'twin.macro'

import { NFTsTab } from '@/constants/common.const'
import FormNFT from '@/modules/nfts/create'
import ListNFT from '@/modules/nfts/list'
import CommunityStore from '@/store/local/community'
import { PositiveButton } from '@/widgets/buttons'
import { HorizontalBetween, VerticalFullWidthCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Text2xl } from '@/widgets/text'

const FixedWidth = tw.div`w-[840px]`

const Frame = tw(VerticalFullWidthCenter)`py-6`

const Header = tw(Text2xl)`
  w-full
  py-5
  font-medium
`

const Index: FC = () => {
  const tab = CommunityStore.useStoreState((state) => state.nftTab)
  const setTab = CommunityStore.useStoreActions((actions) => actions.setNftTab)

  const renderContent = () => {
    switch (tab) {
      case NFTsTab.CreateNFT:
        return <FormNFT />
      case NFTsTab.ListNFT:
        return <ListNFT />
      default:
        return <ListNFT />
    }
  }

  return (
    <Frame>
      <FixedWidth>
        <HorizontalBetween>
          <Header>{'NFTs'}</Header>
          {tab === NFTsTab.ListNFT && (
            <PositiveButton onClick={() => setTab(NFTsTab.CreateNFT)}>Create </PositiveButton>
          )}
        </HorizontalBetween>
        <Gap height={10} />
      </FixedWidth>
      <FixedWidth>{renderContent()}</FixedWidth>
    </Frame>
  )
}

export default Index
