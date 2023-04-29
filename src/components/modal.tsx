import { Fragment, FunctionComponent, ReactNode } from 'react'

import { ModalBg } from '@/styles/modal.style'
import { Dialog, Transition } from '@headlessui/react'

const Modal: FunctionComponent<{ isOpen: boolean; children: ReactNode }> = ({
  isOpen,
  children,
}) => {
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
        {children}
      </Dialog>
    </Transition>
  )
}

export default Modal
