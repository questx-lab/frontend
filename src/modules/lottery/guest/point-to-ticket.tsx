import { FC, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'

import { ColorEnum, LotteryViewEnum } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import {
  BorderBox,
  EndHorizontal,
  Frame,
  GapHorizontal,
  InputForm,
} from '@/modules/lottery/guest/mini-widget'
import { ColorBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import CommunityStore from '@/store/local/community'
import ViewLotteryStore from '@/store/local/view-lottery'
import { GlobalStoreModel } from '@/store/store'
import { FollowCommunityType } from '@/types/community'
import { PositiveButton } from '@/widgets/buttons'
import { Image } from '@/widgets/image'
import { TextSm } from '@/widgets/text'
import { TicketIcon } from '@heroicons/react/20/solid'
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline'

const WarningBox: FC<{ isWarning: boolean }> = ({ isWarning }) => {
  if (!isWarning) {
    return <></>
  }

  return (
    <ColorBox boxColor={ColorEnum.DANGER}>
      {'Current point must greater than or equal to point convert'}
    </ColorBox>
  )
}

const PointToTicket: FC = () => {
  // data
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const communitiesFollowing: FollowCommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesFollowing
  )
  const ticketConvert = ViewLotteryStore.useStoreState((state) => state.ticketConvert)
  const pointConvert = ViewLotteryStore.useStoreState((state) => state.pointConvert)
  const lotteryEvent = ViewLotteryStore.useStoreState((state) => state.lotteryEvent)

  // action
  const setView = ViewLotteryStore.useStoreActions((action) => action.setView)
  const setTicketConvert = ViewLotteryStore.useStoreActions((action) => action.setTicketConvert)
  const setPointConvert = ViewLotteryStore.useStoreActions((action) => action.setPointConvert)

  // hook
  const [currentPoint, setCurrentPoint] = useState<number>(0)

  useEffect(() => {
    // TODO: hardcode point per ticket
    if (lotteryEvent) {
      if (lotteryEvent.point_per_ticket === 0) {
        setTicketConvert(Math.floor(pointConvert))
      } else {
        setTicketConvert(Math.floor(pointConvert / lotteryEvent.point_per_ticket))
      }
    }
  }, [pointConvert, lotteryEvent])

  useEffect(() => {
    communitiesFollowing &&
      communitiesFollowing.forEach((follow) => {
        if (follow.community.handle === community.handle) {
          if (follow.points) {
            setPointConvert(follow.points)
            setCurrentPoint(follow.points)
          }
        }
      })
  }, [communitiesFollowing])

  const Description: FC = () => {
    if (!lotteryEvent) {
      return <></>
    }

    return (
      <TextSm>
        {`You currently have ${currentPoint} points. Do you want to exchange every ${lotteryEvent.point_per_ticket} points for 1 ticket?`}
      </TextSm>
    )
  }

  return (
    <Frame>
      <Description />
      <GapHorizontal>
        <BorderBox>
          <Image width={20} height={20} src={StorageConst.GEM.src} alt='' />
          <InputForm
            value={pointConvert}
            onChange={(e) => setPointConvert(parseInt(e.target.value || '0', 10))}
            type='number'
            min={0}
          />
        </BorderBox>
        <ArrowsRightLeftIcon className='w-16 h-16 font-bold text-gray-900' />
        <BorderBox>
          <TicketIcon className='w-5 h-5 text-primary' />
          <InputForm disabled value={ticketConvert} />
        </BorderBox>
      </GapHorizontal>
      <WarningBox isWarning={pointConvert > currentPoint} />
      <EndHorizontal>
        <PositiveButton
          block={pointConvert > currentPoint}
          onClick={() => setView(LotteryViewEnum.BUY_TICKET)}
        >
          {'Play'}
        </PositiveButton>
      </EndHorizontal>
    </Frame>
  )
}

export default PointToTicket
