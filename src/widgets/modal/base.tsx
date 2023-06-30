import { FC, Fragment, ReactNode, useEffect } from 'react'

import { Background, FixedOverflow } from '@/widgets/modal/mini-widgets'
import { Dialog, Transition } from '@headlessui/react'

const BaseModal: FC<{
  isOpen: boolean
  children: ReactNode
  onClose?: (value: boolean) => void
}> = ({ isOpen, children, onClose }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose && onClose(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => {
          if (onClose) {
            onClose(false)
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Background />
        </Transition.Child>

        <FixedOverflow>{children}</FixedOverflow>
      </Dialog>
    </Transition>
  )
}

export default BaseModal
