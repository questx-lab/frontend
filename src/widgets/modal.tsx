import { Fragment, FunctionComponent, ReactNode } from 'react'

import { MoonLoader } from 'react-spinners'

import { CloseIcon, Gap, SpinnerStyle } from '@/styles/common.style'
import {
  CenterWrap,
  DesModal,
  DialogPannel,
  ModalBg,
  ModalWrap,
  TitleModal,
  TMContent,
  TMWrap,
  WrapProgressBar,
} from '@/styles/modal.style'
import { CHeadling, TMain, TMHeader } from '@/styles/questboard.style'
import { Dialog, Transition } from '@headlessui/react'

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

export const TemplateModal: FunctionComponent<{
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
  title: string
}> = ({ isOpen, onClose, title, children }) => {
  return (
    <BaseModal isOpen={isOpen}>
      <TMContent>
        <Transition.Child
          as={Fragment}
          enter='linear duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='linear duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <TMWrap>
            <TMHeader>
              <CHeadling>{title}</CHeadling>
              <CloseIcon
                onClick={onClose}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </CloseIcon>
            </TMHeader>
            <TMain>{children}</TMain>
          </TMWrap>
        </Transition.Child>
      </TMContent>
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