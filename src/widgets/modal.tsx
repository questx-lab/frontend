import { Fragment, FunctionComponent, ReactNode } from 'react'

import { MoonLoader } from 'react-spinners'

import { Gap, SpinnerStyle } from '@/styles/common.style'
import {
  CenterWrap,
  DesModal,
  DialogPannel,
  MDHead,
  ModalBg,
  ModalBox,
  ModalContent,
  ModalWrap,
  TitleModal,
  WrapProgressBar,
} from '@/styles/modal.style'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

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
            {title || <div></div>}
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

export const LoadingModal: FunctionComponent<{ isOpen?: boolean }> = ({
  isOpen = false,
}) => {
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
