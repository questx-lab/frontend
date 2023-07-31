import { FC, useState } from 'react'

import tw from 'twin.macro'

import { LeaderboardRangeEnum } from '@/constants/common.const'
import RenderLeaderboard from '@/modules/community/community-view/guest-or-anonymous/leaderboard/leaderboard-list'
import { SelectLeaderboard } from '@/modules/community/community-view/guest-or-anonymous/sidebar/leaderboard'
import CommunityStore from '@/store/local/community'
import { PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalCenter,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { TextXl } from '@/widgets/text'
import { XMarkIcon } from '@heroicons/react/24/outline'

const PaddingHorizontalFullWidth = tw(
  HorizontalBetweenCenterFullWidth
)`p-6 border-b border-solid border-gray-200`

const PaddingModal = tw(VerticalFullWidth)`w-full h-full overflow-y-scroll p-6`

const LeaderboardShow: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectRange, setSelectRange] = useState<LeaderboardRangeEnum>(LeaderboardRangeEnum.WEEK)

  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)

  const onClose = () => {
    setShowModal(false)
  }

  const onOpen = () => {
    setShowModal(true)
  }

  const onSelectRange = (range: LeaderboardRangeEnum) => {
    setSelectRange(range)
  }

  return (
    <>
      <PositiveButton onClick={onOpen} isFull>
        {'SHOW ALL LEADERBOARD'}
      </PositiveButton>
      <BasicModal
        hasHeader={false}
        styled='!w-[480px] max-h-[708px]'
        isOpen={showModal}
        onClose={onClose}
      >
        <PaddingHorizontalFullWidth>
          <HorizontalCenter>
            <TextXl>{'Leaderboard'}</TextXl>
            <SelectLeaderboard selectRange={selectRange} onSelectRange={onSelectRange} />
          </HorizontalCenter>
          <XMarkIcon className='cursor-pointer w-6 h-6 text-gray-900' onClick={onClose} />
        </PaddingHorizontalFullWidth>
        <PaddingModal>
          <RenderLeaderboard community={community} range={selectRange} />
        </PaddingModal>
      </BasicModal>
    </>
  )
}

export default LeaderboardShow
