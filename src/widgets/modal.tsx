import { Fragment, FunctionComponent, ReactNode } from 'react'

import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import tw from 'twin.macro'

import { Gap, SpinnerStyle } from '@/styles/common.style'
import { Horizontal, HorizontalCenter } from '@/widgets/orientation'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const ModalBg = tw.div`
  fixed
  inset-0
  bg-black
  bg-opacity-80
  backdrop-blur-sm
`

const ModalWrap = tw.div`
  fixed
  inset-0
  overflow-y-auto
`

export const ModalBox = tw(HorizontalCenter)`
  flex
  h-full
  items-center
  justify-center
  text-center
  py-6
`

const MDHead = tw(Horizontal)`
  w-full
  justify-between
  items-center
  px-8
  py-4
  text-2xl
  font-normal
  text-black
  border
  border-solid
  border-gray-200
`

export const ModalContent = styled(Dialog.Panel)(
  tw`
  w-1/2
  max-xl:w-2/3
  h-full
  bg-white
  text-center
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

const CenterWrap = tw.div`
  flex
  h-full
  items-center
  justify-center
  text-center
`
const DialogPannel = styled(Dialog.Panel)(
  tw`
  w-full
  max-w-md
  transform
  overflow-hidden
  rounded-2xl
  bg-white
  p-10
  text-left
  align-middle
  shadow-xl
  transition-all
  flex
  flex-col
  justify-center
  items-center
  `
)

const LDDP = styled(Dialog.Panel)(
  tw`
  w-2/3
  h-[720px]
  overflow-hidden
  rounded-2xl
  bg-white
  p-6
  text-left
  align-middle
  shadow-xl
  transition-all
  flex
  flex-col
  justify-start
  items-center
  `
)

const TitleModal = tw.h2`
  text-black
  font-bold
  text-3xl
`

const DesModal = tw.h4`
  text-lg
  text-gray-500
  font-normal
`

const WrapProgressBar = tw.div`
  w-[200px]
  h-[200px]
  flex
  justify-center
  items-center
`

export const BaseModal: FunctionComponent<{
  isOpen: boolean
  children: ReactNode
}> = ({ isOpen, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <ModalBg />
        </Transition.Child>

        <ModalWrap>{children}</ModalWrap>
      </Dialog>
    </Transition>
  )
}

export const BasicModal: FunctionComponent<{
  isOpen: boolean
  children: ReactNode
  title?: string
  onClose: () => void
  styled?: string
}> = ({ isOpen, children, title = '', onClose, styled }) => {
  return (
    <BaseModal isOpen={isOpen}>
      <ModalBox>
        <ModalContent className={styled}>
          <MDHead>
            {title}
            <XMarkIcon className='w-7 h-7 cursor-pointer' onClick={onClose} />
          </MDHead>
          {children}
        </ModalContent>
      </ModalBox>
    </BaseModal>
  )
}

export const ProgressModal: FunctionComponent<{
  isOpen: boolean
  title: string
  lines: string[]
}> = ({ isOpen, title, lines }) => {
  const text = lines.map((e, i) => {
    return <DesModal key={i}>{e}</DesModal>
  })

  return (
    <>
      <BaseModal isOpen={isOpen}>
        <CenterWrap>
          <DialogPannel>
            <WrapProgressBar>
              <MoonLoader
                color={'#000'}
                loading={true}
                cssOverride={SpinnerStyle}
                size={150}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </WrapProgressBar>
            <Gap height={6} />
            <TitleModal>{title}</TitleModal>
            <Gap height={6} />
            {text}
          </DialogPannel>
        </CenterWrap>
      </BaseModal>
    </>
  )
}

export const LoadingModal: FunctionComponent<{ isOpen?: boolean }> = ({ isOpen = false }) => {
  return (
    <BaseModal isOpen={isOpen}>
      <CenterWrap>
        <DialogPannel>
          <WrapProgressBar>
            <MoonLoader
              color={'#000'}
              loading={true}
              cssOverride={SpinnerStyle}
              size={50}
              aria-label='Loading Spinner'
              data-testid='loader'
            />
          </WrapProgressBar>
        </DialogPannel>
      </CenterWrap>
    </BaseModal>
  )
}
