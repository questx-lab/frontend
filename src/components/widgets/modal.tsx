import { Fragment, FunctionComponent } from 'react'

import { MDialog } from '@/styles/home.style'
import { ModalBg, ModalWrap, TMContent, TMWrap } from '@/styles/modal.style'
import { Transition } from '@headlessui/react'

const TemplateModal: FunctionComponent<{ children: any; isOpen: boolean }> = ({
  children,
  isOpen,
}) => {
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
              <TMWrap>{children}</TMWrap>
            </Transition.Child>
          </TMContent>
        </ModalWrap>
      </MDialog>
    </Transition>
  )
}

export default TemplateModal
