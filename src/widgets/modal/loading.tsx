import { FunctionComponent } from 'react'

import { MoonLoader } from 'react-spinners'

import BaseModal from '@/widgets/modal/base'
import { CenterWrap, DialogPannel, WrapProgressBar } from '@/widgets/modal/mini-widgets'
import { SpinnerStyle } from '@/widgets/spinner'

const LoadingModal: FunctionComponent<{ isOpen?: boolean }> = ({ isOpen = false }) => {
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

export default LoadingModal
