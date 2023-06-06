import { FunctionComponent } from 'react'

import { MoonLoader } from 'react-spinners'

import BaseModal from '@/widgets/modal/base'
import {
  CenterWrap,
  DesModal,
  DialogPannel,
  TitleModal,
  WrapProgressBar,
} from '@/widgets/modal/mini-widgets'
import { Gap } from '@/widgets/separator'
import { SpinnerStyle } from '@/widgets/spinner'

const ProgressModal: FunctionComponent<{
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
        <CenterWrap>
          <DialogPannel>
            <WrapProgressBar>
              <MoonLoader
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
        </CenterWrap>
      </BaseModal>
    </>
  )
}

export default ProgressModal
