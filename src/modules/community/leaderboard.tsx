import { FunctionComponent, useEffect, useState } from 'react'

import Image from 'next/image'
import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import tw from 'twin.macro'

import { getLeaderboardApi } from '@/app/api/client/project'
import {
  LeaderboardConst,
  LeaderboardRangeEnum,
  LeaderboardRangeMap,
} from '@/constants/project.const'
import { StorageConst } from '@/constants/storage.const'
import { CommunityStore } from '@/store/local/community.store'
import { LeaderboardStore } from '@/store/local/leaderboard.store'
import { PointText } from '@/styles/questboard.style'
import { LeaderboardType } from '@/types/project.type'
import { Horizontal, VerticalCenter } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { Tab } from '@headlessui/react'

export const TabWrap = tw.div`
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
`

export const TabBox = tw.div`
  w-full
  max-w-md
  pt-4
  sm:px-0
`

export const TabList = styled(Tab.List)(tw`
  flex
  space-x-1
  bg-white
`)

export const TabPannel = styled(Tab.Panel)(tw`
  rounded-xl
  bg-white
  px-4
  py-2
`)

export const Item = tw.li`
  relative
  py-2
  flex
  flex-row
  justify-between
  items-center
  cursor-pointer
`

export const Info = tw(Horizontal)`
  justify-center
  items-center
`

export const TextItem = tw.span`
  max-w-[120px]
  font-normal
  text-[#C2410C]
  text-sm
  overflow-hidden
  text-ellipsis
  ml-4
`

export const Avatar = styled(Image)(
  () => tw`
  rounded-lg
`
)

const EmptyBox = tw(VerticalCenter)`
  w-full
  p-3
`

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const RenderList: FunctionComponent<{ data: LeaderboardType[] }> = ({
  data,
}) => {
  const reanderItems =
    data &&
    data.map((ld, idx) => (
      <Item key={idx}>
        <Info>
          <Avatar
            width={40}
            height={40}
            src={`/images/dummy/1.svg`}
            alt={'logo'}
          />
          <TextItem>{ld.user?.name}</TextItem>
        </Info>
        <PointText>{ld.total_point}</PointText>
      </Item>
    ))

  if (!data.length) {
    return <Empty />
  }

  return <>{reanderItems}</>
}

const RenderLeaderboard: FunctionComponent<{
  range: string
  week: LeaderboardType[]
  month: LeaderboardType[]
  total: LeaderboardType[]
}> = ({ range, week, month, total }) => {
  switch (range) {
    case LeaderboardRangeEnum.WEEK:
      return <RenderList data={week} />
    case LeaderboardRangeEnum.MONTH:
      return <RenderList data={month} />

    case LeaderboardRangeEnum.TOTAL:
      return <RenderList data={total} />
  }

  return <RenderList data={week} />
}

const Empty: FunctionComponent = () => {
  return (
    <EmptyBox>
      <Image
        width={300}
        height={300}
        src={StorageConst.HUSKY.src}
        alt={StorageConst.HUSKY.alt}
      />
      <NormalText className='text-center'>
        {
          'There is no information about the leaderboard yet. Create more quests and connect users to have this leaderboard.'
        }
      </NormalText>
    </EmptyBox>
  )
}

const Leaderboard: FunctionComponent = () => {
  // data
  const project = CommunityStore.useStoreState((state) => state.project)
  const week = LeaderboardStore.useStoreState((state) => state.week)
  const month = LeaderboardStore.useStoreState((state) => state.month)
  const all = LeaderboardStore.useStoreState((state) => state.all)

  // action
  const setWeek = LeaderboardStore.useStoreActions((action) => action.setWeek)
  const setMonth = LeaderboardStore.useStoreActions((action) => action.setMonth)
  const setAll = LeaderboardStore.useStoreActions((action) => action.setAll)

  // hook
  const [tab, setTab] = useState<string>(LeaderboardRangeEnum.WEEK)
  const [apiCall, setApiCall] = useState<boolean[]>([false, false, false])
  useEffect(() => {
    getLeaderboard(LeaderboardRangeEnum.WEEK)
    setApiCall([true, false, false])
  }, [])

  useEffect(() => {
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
      const data = await getLeaderboardApi(
        project.id,
        range,
        LeaderboardConst.POINT
      )
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
            case LeaderboardRangeEnum.TOTAL:
              setAll(data.data?.leaderboard)
              break
          }
        }
      }
    } catch (error) {}
  }

  return (
    <TabWrap>
      <TabBox>
        <Tab.Group>
          <TabList>
            {Array.from(LeaderboardRangeMap.values()).map((category, i) => (
              <Tab
                key={i}
                onClick={() => {
                  setTab(Array.from(LeaderboardRangeMap.keys())[i])
                }}
                className={({ selected }) =>
                  classNames(
                    'pb-4 font-medium w-full text-sm leading-5 text-black outline-0 ring-0',
                    selected
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-black  hover:text-black border-b-[1px] border-gray-200'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </TabList>
          <Tab.Panels className='mt-2 '>
            {Array.from(LeaderboardRangeMap.values()).map((e, idx) => (
              <TabPannel key={idx}>
                <ul>
                  <RenderLeaderboard
                    range={tab}
                    week={week}
                    month={month}
                    total={all}
                  />
                </ul>
              </TabPannel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </TabBox>
    </TabWrap>
  )
}

export default Leaderboard
