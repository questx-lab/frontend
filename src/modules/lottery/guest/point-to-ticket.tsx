import { FC, useEffect, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { toast } from 'react-hot-toast'

import { getLotteryEventApi } from '@/api/loterry'
import { LotteryViewEnum } from '@/constants/common.const'
import StorageConst from '@/constants/storage.const'
import {
  BorderBox,
  EndHorizontal,
  Frame,
  GapHorizontal,
  InputForm,
} from '@/modules/lottery/guest/mini-widget'
import CommunityStore from '@/store/local/community'
import ViewLotteryStore from '@/store/local/view-lottery'
import { GlobalStoreModel } from '@/store/store'
import { FollowCommunityType } from '@/types/community'
import { LotteryEventType } from '@/types/lottery'
import { PositiveButton } from '@/widgets/buttons'
import { Image } from '@/widgets/image'
import { SmallSpinner } from '@/widgets/spinner'
import { TextSm } from '@/widgets/text'
import { TicketIcon } from '@heroicons/react/20/solid'
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline'

const PointToTicket: FC = () => {
  // data
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const communitiesFollowing: FollowCommunityType[] = useStoreState<GlobalStoreModel>(
    (state) => state.communitiesFollowing
  )
  const ticketConvert = ViewLotteryStore.useStoreState((state) => state.ticketConvert)
  const pointConvert = ViewLotteryStore.useStoreState((state) => state.pointConvert)

  // action
  const setView = ViewLotteryStore.useStoreActions((action) => action.setView)
  const setTicketConvert = ViewLotteryStore.useStoreActions((action) => action.setTicketConvert)
  const setPointConvert = ViewLotteryStore.useStoreActions((action) => action.setPointConvert)

  // hook
  const [currentPoint, setCurrentPoint] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [lotteryEvent, setLotteryEvent] = useState<LotteryEventType>()
  useEffect(() => {
    // TODO: hardcode point per ticket
    if (lotteryEvent) {
      setTicketConvert(Math.floor(pointConvert / lotteryEvent.point_per_ticket))
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

  useEffect(() => {
    getLotteryEvent()
  }, [])

  const getLotteryEvent = async () => {
    try {
      const { data, error } = await getLotteryEventApi(community.handle)
      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        setLotteryEvent(data.event)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const Description: FC = () => {
    if (loading) {
      return <SmallSpinner />
    }

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

      <EndHorizontal>
        <PositiveButton onClick={() => setView(LotteryViewEnum.BUY_TICKET)}>
          {'Play'}
        </PositiveButton>
      </EndHorizontal>
    </Frame>
  )
}

export default PointToTicket
