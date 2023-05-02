import { FunctionComponent, ReactNode } from 'react'

import { CloseIcon } from '@/styles/common.style'
import { TMWrap } from '@/styles/modal.style'
import { CHeadling, TMain, TMHeader } from '@/styles/questboard.style'
import BaseModal from '@/widgets/base-modal'

export const TemplateModal: FunctionComponent<{
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
  title: string
}> = ({ isOpen, onClose, title, children }) => {
  return (
    <BaseModal isOpen={isOpen}>
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
    </BaseModal>
  )
}
