import Modal from '@/components/modal'
import {
  DesModal,
  DialogPannel,
  ModalContent,
  ModalWrap,
  TitleModal,
  WrapProgressBar,
} from '@/styles/modal.style'
import { Fragment, FunctionComponent } from 'react'
import { Transition } from '@headlessui/react'
import { DotLoader } from 'react-spinners'
import { Gap, SpinnerStyle } from '@/styles/common.style'

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
      <Modal isOpen={isOpen}>
        <ModalWrap>
          <ModalContent>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
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
            </Transition.Child>
          </ModalContent>
        </ModalWrap>
      </Modal>
    </>
  )
}

export default ProgressModal
