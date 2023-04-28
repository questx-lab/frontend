import { Fragment } from 'react'

import LeftSide from '@/modules/project/manage/template/leftside'
import { CloseIcon, Gap } from '@/styles/common.style'
import { MDialog } from '@/styles/home.style'
import { ModalBg, ModalWrap, TMContent, TMWrap } from '@/styles/modal.style'
import { CHeadling, TMain, TMHeader } from '@/styles/questboard.style'
import { Transition } from '@headlessui/react'

export default function TemplateModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <MDialog onClose={() => {}}>
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
        <ModalWrap>
          <TMContent>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <TMWrap>
                <TMHeader>
                  <CHeadling>{'Templates'}</CHeadling>
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
                <Gap height={6} />
                <TMain>
                  <LeftSide />
                </TMain>
              </TMWrap>
            </Transition.Child>
          </TMContent>
        </ModalWrap>
      </MDialog>
    </Transition>
  )
}
