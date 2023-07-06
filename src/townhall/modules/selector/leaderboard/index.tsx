import { FC, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { LeaderboardRangeEnum, LeaderboardRangeMap } from '@/constants/common.const'
import phaserGame from '@/townhall/engine/services/game-controller'
import RenderLeaderboard from '@/townhall/modules/selector/leaderboard/leaderboard.list'
import { ItemType } from '@/types/townhall'
import { CloseIcon } from '@/widgets/image'
import { HorizontalBetweenCenter, Vertical, VerticalFullWidth } from '@/widgets/orientation'
import { Divider } from '@/widgets/separator'
import { TextXl } from '@/widgets/text'
import { Tab } from '@headlessui/react'

const Frame = tw(Vertical)`
  w-[480px]
  my-[158px]
  h-full
  bg-white
  rounded-lg
  overflow-y-scroll
  border-2
  border-solid
  border-gray-900
`

const PaddingHorizontal = tw(HorizontalBetweenCenter)`
  w-full
  p-5
`

const LeaderboardFrame = tw(VerticalFullWidth)`
  h-full
`

const TabList = styled(Tab.List)(tw`
  mt-4
  flex
  space-x-1
  bg-white
  w-full
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
    ' pb-4 font-bold w-full text-xs leading-5 text-gray-900 outline-0 ring-0',
    selected
      ? 'text-primary-500 border-b-2 border-primary-500'
      : 'text-gray-700  hover:text-black border-b-[1px] border-gray-200'
  )

const LeaderboardSelector: FC<{ playerSelector: number }> = ({ playerSelector }) => {
  const [tab, setTab] = useState<LeaderboardRangeEnum>(LeaderboardRangeEnum.WEEK)

  if (playerSelector !== ItemType.LEADERBOARD) {
    return <></>
  }

  const onClose = () => {
    phaserGame.changePlayerSelectorListeners(ItemType.NONE)
    if (phaserGame.isPaused) {
      phaserGame.resume()
    }
  }

  return (
    <Frame>
      <PaddingHorizontal>
        <TextXl>{'Leaderboard'}</TextXl>
        <CloseIcon onClick={onClose} />
      </PaddingHorizontal>
      <Divider />
      <LeaderboardFrame>
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

          <Tab.Panels className='mt-2 w-full overflow-y-scroll'>
            {Array.from(LeaderboardRangeMap.values()).map((e, idx) => (
              <TabPannel key={idx}>
                <ul>
                  <RenderLeaderboard range={tab} />
                </ul>
              </TabPannel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </LeaderboardFrame>
    </Frame>
  )
}

export default LeaderboardSelector
