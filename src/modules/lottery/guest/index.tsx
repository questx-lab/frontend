import { FC, useState } from 'react'

import tw from 'twin.macro'

import { LotteryViewEnum } from '@/constants/common.const'
import BuyTicket from '@/modules/lottery/guest/buy-ticket'
import PointToTicket from '@/modules/lottery/guest/point-to-ticket'
import Result from '@/modules/lottery/guest/result'
import ViewLotteryStore from '@/store/local/view-lottery'
import BasicModal from '@/widgets/modal/basic'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  VerticalFullWidthCenter,
} from '@/widgets/orientation'
import { FireIcon } from '@heroicons/react/20/solid'

const Frame = tw(VerticalFullWidthCenter)`
  p-6
  gap-6
`

const EndHorizontal = tw(HorizontalFullWidth)`justify-end`

const BorderBox = tw(HorizontalBetweenCenterFullWidth)`
  border
  border-solid
  border-gray-300
  py-[14px]
  px-4
  rounded-lg
  gap-3
`

const InputForm = tw.input`
  text-sm
  font-normal
  text-gray-900
  outline-0
  ring-0
  w-full
`

const GapHorizontal = tw(HorizontalBetweenCenterFullWidth)`gap-3`

const LotteryContent: FC = () => {
  const view = ViewLotteryStore.useStoreState((state) => state.view)

  if (view === LotteryViewEnum.BUY_TICKET) return <BuyTicket />
  if (view === LotteryViewEnum.RESULT) return <Result />

  return <PointToTicket />
}

const LotteryModal: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const onCloseModal = () => {
    setOpenModal(false)
  }

  const onOpenModal = () => {
    setOpenModal(true)
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
        <ViewLotteryStore.Provider>
          <LotteryContent />
        </ViewLotteryStore.Provider>
      </BasicModal>
    </>
  )
}

export default LotteryModal
