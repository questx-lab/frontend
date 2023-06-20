import { FC } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { NegativeButton, PositiveButton } from '@/widgets/buttons'
import BaseModal from '@/widgets/modal/base'
import { Horizontal, HorizontalCenter } from '@/widgets/orientation'
import { Divider, Gap } from '@/widgets/separator'
import { HeaderText2, TextXl } from '@/widgets/text'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const ModalPosition = tw(HorizontalCenter)`
  flex
  h-full
  items-center
  justify-center
  text-center
`

const BorderBox = styled(Dialog.Panel)(
  tw`
  w-[480px]
  max-sm:w-[335px]
  bg-white
  text-center
  align-middle
  overflow-hidden
  shadow-xl
  transition-all
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
  p-4
  `
)

const Header = tw(Horizontal)`
  w-full
`

const ConfirmationText = tw(HeaderText2)`
  flex
  flex-1
`

const ConfirmationModal: FC<{
  title: string
  isOpen: boolean
  onClose: () => void
  onPositiveClicked: () => void
}> = ({ title, isOpen, onClose, onPositiveClicked }) => {
  return (
    <BaseModal isOpen={isOpen}>
      <ModalPosition>
        <BorderBox>
          <Header>
            <ConfirmationText>Confirmation</ConfirmationText>
            <XMarkIcon onClick={() => onClose()} className='w-7 h-7 cursor-pointer' />
          </Header>

          <Gap />
          <Divider />
          <Gap />

          <TextXl>{title}</TextXl>
          <Gap />
          <Horizontal>
            <NegativeButton onClick={onClose}>Cancel</NegativeButton>
            <Gap width={2} />
            <PositiveButton onClick={onPositiveClicked}>
              <Gap width={1} />
              Yes
              <Gap width={1} />
            </PositiveButton>
          </Horizontal>
        </BorderBox>
      </ModalPosition>
    </BaseModal>
  )
}

export default ConfirmationModal
