import { FC, ReactNode } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import BaseModal from '@/widgets/modal/base'
import { Horizontal, HorizontalCenter } from '@/widgets/orientation'
import { TextXl } from '@/widgets/text'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export enum BasicModalWidthSize {
  ONE_HALF,
  TWO_THIRD,
}

const ModalBox = tw(HorizontalCenter)`
  flex
  py-[80px]
  h-full
`

const ModalContent = styled(Dialog.Panel)<{ widthsize: BasicModalWidthSize }>(({ widthsize }) => {
  const styles = [
    tw`
      w-1/2
      max-xl:w-full
      max-xl:mx-6
      bg-white
      align-middle
      overflow-y-scroll
      shadow-lg
      transition-all
      flex
      flex-col
      justify-center
      items-center
      rounded-lg
    `,
  ]

  switch (widthsize) {
    case BasicModalWidthSize.ONE_HALF:
      styles.push(tw`w-1/2`)
      break
    case BasicModalWidthSize.TWO_THIRD:
      styles.push(tw`w-2/3`)
      break
    default:
      styles.push(tw`w-1/2`)
  }

  return styles
})

const PaddingHorizontal = tw(Horizontal)`
  w-full
  justify-between
  items-center
  p-5
  border
  border-solid
  border-b-gray-200
`

const Title = tw(TextXl)`
  font-medium
  text-gray-900
  max-sm:text-lg
`

export const TopModal: FC<{ hasHeader: boolean; title?: string; onClose: () => void }> = ({
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
      <XMarkIcon className='w-6 h-6 cursor-pointer text-gray-500' onClick={onClose} />
    </PaddingHorizontal>
  )
}

const BasicModal: FC<{
  isOpen: boolean
  children: ReactNode
  title?: string
  onClose: () => void
  hasHeader?: boolean
  styled?: string
  widthsize?: BasicModalWidthSize
}> = ({
  isOpen,
  children,
  title = '',
  onClose,
  hasHeader = true,
  styled,
  widthsize = BasicModalWidthSize.ONE_HALF,
}) => {
  return (
    <BaseModal onClose={onClose} isOpen={isOpen}>
      <ModalBox>
        <ModalContent className={styled} widthsize={widthsize}>
          <TopModal hasHeader={hasHeader} title={title} onClose={onClose} />
          {children}
        </ModalContent>
      </ModalBox>
    </BaseModal>
  )
}

export default BasicModal
