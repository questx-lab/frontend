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
  w-[1200px]
  max-lg:w-[680px]
  max-sm:w-full
  gap-6
  divide-x
  divide-gray-300
`

const VerticalFixedWidth = tw(Vertical)`
  w-[680px]
  p-6
  border-r
  border-solid
  border-gray-200
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
