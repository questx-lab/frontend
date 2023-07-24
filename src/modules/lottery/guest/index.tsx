import { FC, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { getLotteryEventApi } from '@/api/loterry'
import { LotteryViewEnum } from '@/constants/common.const'
import BuyTicket from '@/modules/lottery/guest/buy-ticket'
import PointToTicket from '@/modules/lottery/guest/point-to-ticket'
import Result from '@/modules/lottery/guest/result'
import ViewLotteryStore from '@/store/local/view-lottery'
import { isExpired } from '@/utils/validation'
import BasicModal from '@/widgets/modal/basic'
import { FireIcon } from '@heroicons/react/20/solid'

const LotteryContent: FC = () => {
  const view = ViewLotteryStore.useStoreState((state) => state.view)

  if (view === LotteryViewEnum.BUY_TICKET) return <BuyTicket />
  if (view === LotteryViewEnum.RESULT) return <Result />

  return <PointToTicket />
}

const LotteryModal: FC = () => {
  const { communityHandle } = useParams()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const lotteryEvent = ViewLotteryStore.useStoreState((state) => state.lotteryEvent)
  const setLotteryEvent = ViewLotteryStore.useStoreActions((action) => action.setLotteryEvent)

  const onCloseModal = () => {
    setOpenModal(false)
  }

  const onOpenModal = () => {
    setOpenModal(true)
  }

  const getLotteryEvent = async () => {
    try {
      const { data, error } = await getLotteryEventApi(communityHandle || '')
      if (error) {
        return
      }

      if (data) {
        setLotteryEvent(data.event)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getLotteryEvent()
  }, [communityHandle])

  if (!communityHandle) {
    return <></>
  }

  if (!lotteryEvent) {
    return <></>
  }

  if (lotteryEvent.max_tickets === lotteryEvent.used_tickets || isExpired(lotteryEvent.end_time)) {
    return <></>
  }

  return (
    <>
      <FireIcon onClick={onOpenModal} className='w-6 h-6 cursor-pointer text-danger' />
      <BasicModal
        styled='!w-[480px]'
        title='Lottery Wheel'
        isOpen={openModal}
        onClose={onCloseModal}
      >
        <LotteryContent />
      </BasicModal>
    </>
  )
}

export default LotteryModal
