import { FunctionComponent } from 'react'
import {
  DesModal,
  DialogPannel,
  TitleModal,
  WrapProgressBar,
} from '@/styles/modal.style'
import { DotLoader } from 'react-spinners'
import { Gap, SpinnerStyle } from '@/styles/common.style'
import BaseModal from '@/widgets/base-modal'

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
        <DialogPannel>
          <WrapProgressBar>
            <DotLoader
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
      </BaseModal>
    </>
  )
}

export default ProgressModal
