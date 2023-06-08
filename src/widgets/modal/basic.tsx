import { FunctionComponent, ReactNode } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import BaseModal from '@/widgets/modal/base'
import { Horizontal, HorizontalCenter } from '@/widgets/orientation'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const ModalBox = tw(HorizontalCenter)`
  flex
  h-full
  py-6
`

const ModalContent = styled(Dialog.Panel)(
  tw`
  w-1/2
  max-xl:w-2/3
  h-full
  bg-white
  align-middle
  overflow-y-scroll
  shadow-xl
  transition-all
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
  `
)

const PaddingHorizontal = tw(Horizontal)`
  w-full
  justify-between
  items-center
  px-8
  py-4
`

const Title = tw.div`
  text-2xl
  font-normal
  text-black
`

const TopModal: FunctionComponent<{ hasHeader: boolean; title?: string; onClose: () => void }> = ({
  hasHeader,
  title,
  onClose,
}) => {
  if (!hasHeader) {
    return <></>
  }

  return (
    <PaddingHorizontal>
      <Title>{title}</Title>
      <XMarkIcon className='w-7 h-7 cursor-pointer' onClick={onClose} />
    </PaddingHorizontal>
  )
}

const BasicModal: FunctionComponent<{
  isOpen: boolean
  children: ReactNode
  title?: string
  onClose: () => void
  hasHeader?: boolean
  styled?: string
}> = ({ isOpen, children, title = '', onClose, hasHeader = true, styled }) => {
  return (
    <BaseModal isOpen={isOpen}>
      <ModalBox>
        <ModalContent className={styled}>
          <TopModal hasHeader={hasHeader} title={title} onClose={onClose} />
          {children}
        </ModalContent>
      </ModalBox>
    </BaseModal>
  )
}

export default BasicModal
