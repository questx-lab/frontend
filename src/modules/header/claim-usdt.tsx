import { FC, useState } from 'react'

import tw from 'twin.macro'

import { PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import { VerticalFullWidthCenter } from '@/widgets/orientation'
import { OptionxBox } from '@/widgets/popover'
import { TextSm } from '@/widgets/text'

const Frame = tw(VerticalFullWidthCenter)`gap-6 p-6`

// TODO: just view and current don't show in user popover
const ClaimBalance: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const onOpenModal = () => {
    setOpenModal(true)
  }

  const onCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <OptionxBox onClick={onOpenModal}>{'Claim USDT'}</OptionxBox>
      <BasicModal styled='!w-[480px]' title='Claim USDT' isOpen={openModal} onClose={onCloseModal}>
        <Frame>
          <TextSm>
            {
              'You currently have 24 USDT. \n\
Would you like to claim it?'
            }
          </TextSm>
          <PositiveButton>{'Claim USDT'}</PositiveButton>
        </Frame>
      </BasicModal>
    </>
  )
}

export default ClaimBalance
