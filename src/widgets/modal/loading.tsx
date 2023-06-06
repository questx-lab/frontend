import { FunctionComponent } from 'react'

import { MoonLoader } from 'react-spinners'

import BaseModal from '@/widgets/modal/base'
import { CenterWrap, DialogPannel, WrapProgressBar } from '@/widgets/modal/mini-widgets'
import { SpinnerStyle } from '@/widgets/spinner'
import { CheckBadgeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import { VerticalFullWidthCenter } from '../orientation'
import { NormalText } from '../text'

const LoadingModal: FunctionComponent<{
  isOpen?: boolean
  isSuccess?: boolean
  message?: string
}> = ({ isOpen = false, isSuccess, message }) => {
  const RenderContent: FunctionComponent = () => {
    if (isSuccess === false) {
      return (
        <VerticalFullWidthCenter>
          <ExclamationTriangleIcon className='w-15 h-15 text-danger' />
          <NormalText>{message}</NormalText>
        </VerticalFullWidthCenter>
      )
    }

    if (isSuccess === true) {
      return (
        <VerticalFullWidthCenter>
          <CheckBadgeIcon className='w-15 h-15 text-success' />
          <NormalText>{message}</NormalText>
        </VerticalFullWidthCenter>
      )
    }

    return (
      <MoonLoader
        color={'#000'}
        loading={true}
        cssOverride={SpinnerStyle}
        size={50}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    )
  }

  return (
    <BaseModal isOpen={isOpen}>
      <CenterWrap>
        <DialogPannel>
          <WrapProgressBar>
            <RenderContent />
          </WrapProgressBar>
        </DialogPannel>
      </CenterWrap>
    </BaseModal>
  )
}

export default LoadingModal
