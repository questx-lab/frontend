import { FC } from 'react'

import tw from 'twin.macro'

import CommunityInformation from '@/modules/community/community-view/guest-or-anonymous/community-infomation'
import CommunityQuests from '@/modules/community/community-view/guest-or-anonymous/community-quests'
import CommunitySidebar from '@/modules/community/community-view/guest-or-anonymous/sidebar'
import CommunityStore from '@/store/local/community'
import { Horizontal, Vertical, VerticalFullWidth } from '@/widgets/orientation'

const Content = tw(VerticalFullWidth)`
  justify-start
  items-center
  gap-0
`

const FixedWidth = tw(Horizontal)`
  w-[1440px]
  lg:w-[1200px]
  sm:w-full
  max-sm:w-full
  gap-6
  justify-center
  p-6
`

const VerticalFixedWidth = tw(Vertical)`
  w-[888px]
  lg:w-[648px]  
  max-sm:w-full
`

const CommunityGuestOrAnonymous: FC = () => {
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  if (!community) {
    return <></>
  }

  return (
    <Content>
      <FixedWidth>
        <VerticalFixedWidth>
          <CommunityInformation />
          <CommunityQuests />
        </VerticalFixedWidth>
        <CommunitySidebar />
      </FixedWidth>
    </Content>
  )
}

export default CommunityGuestOrAnonymous
