import { FunctionComponent, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { LeaderboardRangeEnum, LeaderboardRangeMap } from '@/constants/common.const'
import RenderLeaderboard from '@/modules/community/community-view/community-guest-or-anonymous/leaderboard/leaderboard-list'
import { Tab } from '@headlessui/react'

const Content = tw.div`
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
`

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
    'pb-4 font-medium w-full text-sm leading-5 text-black outline-0 ring-0',
    selected
      ? 'text-primary-500 border-b-2 border-primary-500'
      : 'text-black  hover:text-black border-b-[1px] border-gray-200'
  )

const Leaderboard: FunctionComponent = () => {
  // hook
  const [tab, setTab] = useState<string>(LeaderboardRangeEnum.WEEK)

  return (
    <Content>
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
                  <RenderLeaderboard range={tab} />
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
