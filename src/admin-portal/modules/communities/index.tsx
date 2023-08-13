import { FC, useEffect, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import CommunityContent from '@/admin-portal/modules/communities/community-table'
import {
  CommunityStats,
  PlatformStats,
} from '@/admin-portal/modules/communities/community-table/stats'
import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { listCommunitiesApi } from '@/api/communitiy'
import { CommunityType } from '@/types/community'
import { HorizontalBetweenCenterFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { MediumTextSm, Text2xl, TextSm } from '@/widgets/text'

const GapVertical = tw(VerticalFullWidth)`
    gap-6
    p-6
    w-[1120px]
  `

const TabFrame = tw(
  HorizontalFullWidthCenter
)`h-[64px] bg-gray-100 rounded-lg  !gap-0 border border-solid border-gray-200`

const TabItem = styled(HorizontalFullWidthCenter)<{ selected: boolean }>(({ selected }) => {
  const styles = [tw`hover:bg-gray-300 cursor-pointer h-full rounded-lg`]
  if (selected) {
    styles.push(tw`bg-white`)
  }
  return styles
})

enum FilterEnum {
  STATS = 'Stats',
  PENDING = 'Pending',
}

const CommunityItem = tw(HorizontalBetweenCenterFullWidth)`
  p-2
  hover:bg-gray-100
  cursor-pointer
  rounded-lg
`

const BorderVertical = tw(VerticalFullWidth)`
  rounded-lg
  p-4
  border
  border-solid
  border-gray-200
`

const StatsTab: FC = () => {
  const [communities, setCommunities] = useState<CommunityType[]>([])
  const [community, setCommunity] = useState<CommunityType>()
  const [isOpenStats, setOpenStats] = useState<boolean>(false)

  useEffect(() => {
    getCommunities()
  }, [])

  const getCommunities = async () => {
    try {
      const { error, data } = await listCommunitiesApi()
      if (error) return
      if (data) {
        setCommunities(data.communities)
      }
    } catch (error) {}
  }

  const onCloseStats = () => {
    setOpenStats(false)
  }

  const renderCommunities = communities.map((community) => (
    <CommunityItem
      onClick={() => {
        setOpenStats(true)
        setCommunity(community)
      }}
      key={community.handle}
    >
      <TextSm>{community.display_name}</TextSm>
      <TextSm>{community.followers}</TextSm>
    </CommunityItem>
  ))

  return (
    <BorderVertical>
      <HorizontalBetweenCenterFullWidth className='p-2'>
        <MediumTextSm>{'Name'}</MediumTextSm>
        <MediumTextSm>{'Followers'}</MediumTextSm>
      </HorizontalBetweenCenterFullWidth>
      {renderCommunities}
      <CommunityStats isOpen={isOpenStats} onClose={onCloseStats} comunity={community} />
    </BorderVertical>
  )
}

const Tab: FC = () => {
  const [tabActive, setTabActive] = useState<FilterEnum>(FilterEnum.STATS)

  const RenderTab: FC = () => {
    if (tabActive === FilterEnum.STATS) {
      return <StatsTab />
    }

    return <CommunityContent />
  }

  return (
    <>
      <TabFrame>
        <TabItem
          selected={tabActive === FilterEnum.STATS}
          onClick={() => setTabActive(FilterEnum.STATS)}
        >
          {FilterEnum.STATS}
        </TabItem>
        <TabItem
          selected={tabActive === FilterEnum.PENDING}
          onClick={() => setTabActive(FilterEnum.PENDING)}
        >
          {FilterEnum.PENDING}
        </TabItem>
      </TabFrame>
      <RenderTab />
    </>
  )
}

const Community: FC = () => {
  return (
    <GapVertical>
      <HorizontalBetweenCenterFullWidth>
        <Text2xl>{'Communities'}</Text2xl>
        <PlatformStats />
      </HorizontalBetweenCenterFullWidth>
      <Tab />
    </GapVertical>
  )
}

export default Community
