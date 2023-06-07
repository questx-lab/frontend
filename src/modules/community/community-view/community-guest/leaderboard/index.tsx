import { FunctionComponent, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getLeaderboardApi } from '@/api/communitiy'
import {
  LeaderboardConst,
  LeaderboardRangeEnum,
  LeaderboardRangeMap,
} from '@/constants/common.const'
import CommunityStore from '@/store/local/community'
import LeaderboardStore from '@/store/local/leaderboard'
import { Tab } from '@headlessui/react'

import RenderLeaderboard from './leaderboard-list'

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
  // data
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const week = LeaderboardStore.useStoreState((state) => state.week)
  const month = LeaderboardStore.useStoreState((state) => state.month)

  // action
  const setWeek = LeaderboardStore.useStoreActions((action) => action.setWeek)
  const setMonth = LeaderboardStore.useStoreActions((action) => action.setMonth)

  // hook
  const [tab, setTab] = useState<string>(LeaderboardRangeEnum.WEEK)
  const [apiCall, setApiCall] = useState<boolean[]>([false, false, false])

  useEffect(() => {
    if (community.handle) {
      getLeaderboard(LeaderboardRangeEnum.WEEK)
      setApiCall([true, false, false])
    }
  }, [community])

  useEffect(() => {
    // Only call one time in the first load
    if (!apiCall[1] && tab === LeaderboardRangeEnum.MONTH) {
      const shallow = apiCall
      shallow[1] = true
      setApiCall(shallow)
      getLeaderboard(LeaderboardRangeEnum.MONTH)
    }

    if (!apiCall[2] && tab === LeaderboardRangeEnum.TOTAL) {
      const shallow = apiCall
      shallow[2] = true
      setApiCall(shallow)
      getLeaderboard(LeaderboardRangeEnum.TOTAL)
    }
  }, [tab])

  // handler
  const getLeaderboard = async (range: string) => {
    try {
      const data = await getLeaderboardApi(community.handle, range, LeaderboardConst.POINT)
      if (data.error) {
        toast.error(data.error)
      } else {
        if (data.data?.leaderboard) {
          switch (range) {
            case LeaderboardRangeEnum.WEEK:
              setWeek(data.data?.leaderboard)
              break
            case LeaderboardRangeEnum.MONTH:
              setMonth(data.data?.leaderboard)
              break
          }
        }
      }
    } catch (error) {}
  }

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
                  <RenderLeaderboard range={tab} week={week} month={month} />
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
