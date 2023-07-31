import { FC, Fragment, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { useParams } from 'react-router-dom'
import tw from 'twin.macro'

import { LeaderboardRangeEnum } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import RenderLeaderboard from '@/modules/community/community-view/guest-or-anonymous/leaderboard/leaderboard-list'
import LeaderboardShow from '@/modules/community/community-view/guest-or-anonymous/sidebar/leaderboard/modal'
import { GlobalStoreModel } from '@/store/store'
import { FollowCommunityType } from '@/types/community'
import { Image } from '@/widgets/image'
import { HorizontalCenter, HorizontalFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { TextSm, TextXl } from '@/widgets/text'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const FullSize = tw(VerticalFullWidth)`
  w-full
  gap-4
  p-6
  border
  border-solid
  border-gray-200
  rounded-lg
`

const GapHorizontal = tw(HorizontalFullWidth)`
  gap-4
`
const Gap1Horizontal = tw(HorizontalCenter)`
  gap-1
`
const PaddingSelect = tw.div`p-3 cursor-pointer text-sm hover:bg-gray-100`

const OverScroll = tw.div`w-full max-h-[324px] overflow-y-scroll`

const Relative = tw.div`relative`

const ListBoxOption = tw(Listbox.Options)`
  z-10
  absolute
  mt-1
  w-full
  overflow-auto
  rounded-md
  bg-white
  py-1
  text-base
  shadow-lg
  ring-opacity-5
  focus:outline-none
`

export const SelectLeaderboard: FC<{
  selectRange: LeaderboardRangeEnum
  onSelectRange: (value: LeaderboardRangeEnum) => void
}> = ({ selectRange, onSelectRange }) => {
  return (
    <Listbox value={selectRange} onChange={onSelectRange}>
      <Relative>
        <Listbox.Button className=' ml-2 relative w-full cursor-pointer text-xl text-primary '>
          <Gap1Horizontal>
            {selectRange}
            <ChevronDownIcon className='w-5 h-5 text-primary' />
          </Gap1Horizontal>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <ListBoxOption>
            <Listbox.Option
              onClick={() => onSelectRange(LeaderboardRangeEnum.WEEK)}
              value={LeaderboardRangeEnum.WEEK}
            >
              <PaddingSelect>{LeaderboardRangeEnum.WEEK}</PaddingSelect>
            </Listbox.Option>
            <Listbox.Option
              onClick={() => onSelectRange(LeaderboardRangeEnum.MONTH)}
              value={LeaderboardRangeEnum.MONTH}
            >
              <PaddingSelect>{LeaderboardRangeEnum.MONTH}</PaddingSelect>
            </Listbox.Option>
          </ListBoxOption>
        </Transition>
      </Relative>
    </Listbox>
  )
}

const Leaderboard: FC = () => {
  const { communityHandle } = useParams()
  const [canShowLeaderboard, setCanShowLeaderboard] = useState<boolean>(false)
  const [selectRange, setSelectRange] = useState<LeaderboardRangeEnum>(LeaderboardRangeEnum.WEEK)

  const communitiesFollowing: FollowCommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesFollowing
  )

  const communityFollow = communitiesFollowing.find(
    (community) => community.community.handle === communityHandle
  )

  const onSelectRange = (range: LeaderboardRangeEnum) => {
    setSelectRange(range)
  }

  useEffect(() => {
    if (communityFollow && communityFollow.quests && communityFollow.quests >= 1) {
      setCanShowLeaderboard(true)
    } else {
      setCanShowLeaderboard(false)
    }
  }, [communityFollow, communityHandle])

  // Must take quest at least 10
  if (canShowLeaderboard && communityFollow && communityFollow.community) {
    return (
      <FullSize>
        <HorizontalFullWidth>
          <TextXl>{'Leaderboard'}</TextXl>
          <SelectLeaderboard selectRange={selectRange} onSelectRange={onSelectRange} />
        </HorizontalFullWidth>
        <OverScroll>
          <RenderLeaderboard community={communityFollow.community} range={selectRange} />
        </OverScroll>
        <LeaderboardShow />
      </FullSize>
    )
  }

  return (
    <FullSize>
      <TextXl>{'Leaderboard'}</TextXl>
      <GapHorizontal>
        <Image width={48} height={48} src={StorageConst.PODIUM.src} alt='' />
        <TextSm>{'Complete 10 quests to start the competition.'}</TextSm>
      </GapHorizontal>
    </FullSize>
  )
}

export default Leaderboard
