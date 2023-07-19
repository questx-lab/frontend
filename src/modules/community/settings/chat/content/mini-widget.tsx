import { FC, ReactNode } from 'react'

import tw from 'twin.macro'

import { PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import { HorizontalFullWidth } from '@/widgets/orientation'

const EndHorizontal = tw(HorizontalFullWidth)`justify-end`

export const ButtonAdd: FC<{
  isOpenModal: boolean
  onModal: (value: boolean) => void
  buttonName: string
  titleModal: string
  children: ReactNode
}> = ({ isOpenModal, onModal, buttonName, titleModal, children }) => {
  return (
    <>
      <EndHorizontal onClick={() => onModal(true)}>
        <PositiveButton>{buttonName}</PositiveButton>
      </EndHorizontal>

      <BasicModal
        title={titleModal}
        styled='!w-[480px]'
        isOpen={isOpenModal}
        onClose={() => onModal(false)}
      >
        {children}
      </BasicModal>
    </>
  )
}
