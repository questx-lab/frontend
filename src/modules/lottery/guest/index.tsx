import { FC, useState } from 'react'

import { useStoreState } from 'easy-peasy'
import { useParams } from 'react-router-dom'

import { LotteryViewEnum } from '@/constants/common.const'
import BuyTicket from '@/modules/lottery/guest/buy-ticket'
import PointToTicket from '@/modules/lottery/guest/point-to-ticket'
import Result from '@/modules/lottery/guest/result'
import ViewLotteryStore from '@/store/local/view-lottery'
import { GlobalStoreModel } from '@/store/store'
import { LotteryEventType } from '@/types/lottery'
import { isExpired } from '@/utils/validation'
import { PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'

const LotteryContent: FC = () => {
  const view = ViewLotteryStore.useStoreState((state) => state.view)

  if (view === LotteryViewEnum.BUY_TICKET) return <BuyTicket />
  if (view === LotteryViewEnum.RESULT) return <Result />

  return <PointToTicket />
}

const LotteryModal: FC = () => {
  const { communityHandle } = useParams()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const lotteryEvent: LotteryEventType = useStoreState<GlobalStoreModel>(
    (state) => state.lotteryEvent
  )

  const onCloseModal = () => {
    setOpenModal(false)
  }

  const onOpenModal = () => {
    setOpenModal(true)
  }

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
      <PositiveButton onClick={onOpenModal} isFull>
        {'PLAY NOW'}
      </PositiveButton>

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

const Lottery: FC = () => {
  return (
    <ViewLotteryStore.Provider>
      <LotteryModal />
    </ViewLotteryStore.Provider>
  )
}

export default Lottery
