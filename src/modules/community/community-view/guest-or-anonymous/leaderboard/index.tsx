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
      w-full
      h-full
      right-0
      border
      border-solid
      bg-white
      border-gray-200
      max-md:hidden
      rounded-lg
  `)
  }

  return styles
})

const FullWidth = tw.div`
  w-full
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
    'py-5 font-medium w-full text-xs outline-0 ring-0',
    selected ? 'text-primary-500 bg-white' : 'text-gray-700 bg-gray-100 '
  )

// TODO: UI change, refactor leaderboard after
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
          <Tab.Panels className='mt-2 overflow-y-scroll max-h-[500px]'>
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
