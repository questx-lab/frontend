import { Fragment, FunctionComponent, ReactNode } from 'react'

import { ModalWrap, ModalBg, TMContent } from '@/styles/modal.style'
import { Dialog, Transition } from '@headlessui/react'

const BaseModal: FunctionComponent<{
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
              {children}
            </Transition.Child>
          </TMContent>
        </ModalWrap>
      </Dialog>
    </Transition>
  )
}

export default BaseModal
