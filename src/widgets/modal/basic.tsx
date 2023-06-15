import { FC, ReactNode } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import BaseModal from '@/widgets/modal/base'
import { Horizontal, HorizontalCenter } from '@/widgets/orientation'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export enum BasicModalWidthSize {
  ONE_HALF,
  TWO_THIRD,
}

const ModalBox = tw(HorizontalCenter)`
  flex
  h-full
  py-6
`

const ModalContent = styled(Dialog.Panel)<{ widthSize: BasicModalWidthSize }>(({ widthSize }) => {
  const styles = [
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
    `,
  ]

  switch (widthSize) {
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
  px-8
  py-4
`

const Title = tw.div`
  text-2xl
  font-normal
  text-black
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
      <XMarkIcon className='w-7 h-7 cursor-pointer' onClick={onClose} />
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
  widthSize?: BasicModalWidthSize
}> = ({
  isOpen,
  children,
  title = '',
  onClose,
  hasHeader = true,
  styled,
  widthSize = BasicModalWidthSize.ONE_HALF,
}) => {
  return (
    <BaseModal onClose={onClose} isOpen={isOpen}>
      <ModalBox>
        <ModalContent className={styled} widthSize={widthSize}>
          <TopModal hasHeader={hasHeader} title={title} onClose={onClose} />
          {children}
        </ModalContent>
      </ModalBox>
    </BaseModal>
  )
}

export default BasicModal
