import { Fragment, FunctionComponent, ReactNode } from 'react'

import Modal from '@/components/modal'
import QuestTemplate from '@/modules/new-quest/quest-template'
import { CloseIcon } from '@/styles/common.style'
import { ModalWrap, TMContent, TMWrap } from '@/styles/modal.style'
import { CHeadling, TMain, TMHeader } from '@/styles/questboard.style'
import { Transition } from '@headlessui/react'

export const TemplateModal: FunctionComponent<{
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
}> = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalWrap>
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
              <TMain>
                <QuestTemplate />
                {children}
              </TMain>
            </TMWrap>
          </Transition.Child>
        </TMContent>
      </ModalWrap>
    </Modal>
  )
}
