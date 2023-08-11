import BasicModal from '@/widgets/modal/basic'
import { FC, useState } from 'react'
import tw from 'twin.macro'

import styled from 'styled-components'
import { EndHorizontal, HorizontalFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import Step1 from '@/modules/wallet/deposit-modal/step1'
import { PositiveButton } from '@/widgets/buttons'
import walletController from '@/modules/wallet/services/wallet-controller'
import CommunityStore from '@/store/local/community'
import Step2 from '@/modules/wallet/deposit-modal/step2'
import Step3 from '@/modules/wallet/deposit-modal/step3'
import { TextSm } from '@/widgets/text'

const Border = tw(VerticalFullWidth)`
  border
  border-solid
  border-gray-200
  p-5
  rounded-lg
  gap-5
`

const ContentBox = tw.div`
  p-6
  w-full
`

const StepListBox = tw.ol`
  flex 
  items-center
  w-full
`

const StepListContainer = tw.div`
  py-5
  w-full
  pl-20
`

const StepContent = styled.span<{
  active: boolean
}>(({ active }) => {
  const style = [
    tw`
      flex
      items-center
      justify-center 
      w-10
      h-10 
      rounded-full 
      lg:h-12
      lg:w-12 
      shrink-0
    `,
  ]
  if (active) style.push(tw`bg-success-500 text-white`)
  else style.push(tw`bg-gray-100`)

  return style
})

const StepBox = styled.li<{
  active: boolean
  isLast: boolean
}>(({ active, isLast }) => {
  const style = [
    tw`
      flex 
      w-full 
      items-center 
    `,
  ]
  if (active) style.push(tw`after:border-success-500`)
  else style.push(tw`after:border-gray-100`)
  if (!isLast)
    style.push(tw`
      after:content-[''] 
      after:w-full 
      after:h-1 
      after:border-b
      after:border-4 
      after:inline-block
  `)

  return style
})

const TextStepList = tw(HorizontalFullWidth)`
  justify-around
  px-10
  pl-7
`
const DepositModal: FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const selectedAccount = CommunityStore.useStoreState((state) => state.selectedAccount)
  const walletAddress = CommunityStore.useStoreState((state) => state.walletAddress)
  const amount = CommunityStore.useStoreState((state) => state.depositAmount)

  const next = async () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
    else await walletController.deposit(walletAddress, selectedAccount, amount)
  }

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3 />

      default:
        break
    }
  }
  return (
    <BasicModal
      title={`Add USDT`}
      isOpen={open}
      onClose={onClose}
      styled={'flex flex-col !justify-start !items-start !w-[600px] !h-[450px]'}
    >
      <StepListContainer>
        <StepListBox>
          {[1, 2, 3].map((step) => (
            <StepBox active={currentStep >= step} isLast={step === 3}>
              <StepContent active={currentStep >= step}>{step}</StepContent>
            </StepBox>
          ))}
        </StepListBox>
      </StepListContainer>
      <TextStepList>
        <TextSm> Select Wallet </TextSm>
        <TextSm> Switch Chain </TextSm>
        <TextSm> Choose Amount </TextSm>
      </TextStepList>
      <ContentBox>
        <Border>{renderContent()}</Border>
      </ContentBox>
      <EndHorizontal className='pr-6'>
        <PositiveButton onClick={() => next()}>
          {currentStep === 3 ? 'Done' : 'Next'}
        </PositiveButton>
      </EndHorizontal>
    </BasicModal>
  )
}

export default DepositModal
