import { FC, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import {
  LeaderboardRangeEnum,
  LeaderboardRangeMap,
  LeaderboardType,
} from '@/constants/common.const'
import RenderLeaderboard from '@/modules/community/community-view/guest-or-anonymous/leaderboard/leaderboard-list'
import { CommunityType } from '@/types/community'
import { Tab } from '@headlessui/react'

const Content = styled.div<{ type: LeaderboardType }>(({ type }) => {
  const styles = []
  if (type === LeaderboardType.TOWNHALL) {
    styles.push(tw`h-full w-full`)
  } else {
    styles.push(tw`
      w-[350px]
      max-2xl:w-[280px]
      h-full
      right-0
      fixed
      border-l-[1px]
      border-solid
      bg-white
      border-gray-200
      overflow-y-scroll
      max-md:hidden
  `)
  }

  return styles
})

const FullWidth = tw.div`
  w-full
  max-w-md
  pt-4
  sm:px-0
`

const TabList = styled(Tab.List)(tw`
  flex
  space-x-1
  bg-white
`)

const TabPannel = styled(Tab.Panel)(tw`
  rounded-xl
  bg-white
  px-4
  py-2
`)

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const selectTab = ({ selected }: { selected: boolean }) =>
  classNames(
    'pb-4 font-bold w-full text-xs leading-5 text-gray-900 outline-0 ring-0',
    selected
      ? 'text-primary-500 border-b-2 border-primary-500'
      : 'text-gray-700  hover:text-black border-b-[1px] border-gray-200'
  )

const Leaderboard: FC<{ community: CommunityType; type?: LeaderboardType }> = ({
  community,
  type = LeaderboardType.PLATFORM,
}) => {
  // hook
  const [tab, setTab] = useState<LeaderboardRangeEnum>(LeaderboardRangeEnum.WEEK)

  return (
    <Content type={type}>
      <FullWidth>
        <Tab.Group>
          <TabList>
            {Array.from(LeaderboardRangeMap.values()).map((category, i) => (
              <Tab
                key={i}
                onClick={() => {
                  setTab(Array.from(LeaderboardRangeMap.keys())[i])
                }}
                className={selectTab}
              >
                {category}
              </Tab>
            ))}
          </TabList>
          <Tab.Panels className='mt-2 '>
            {Array.from(LeaderboardRangeMap.values()).map((e, idx) => (
              <TabPannel key={idx}>
                <ul>
                  <RenderLeaderboard community={community} range={tab} />
                </ul>
              </TabPannel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </FullWidth>
    </Content>
  )
}

export default Leaderboard
