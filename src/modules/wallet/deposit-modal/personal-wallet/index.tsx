import NotConnected from '@/modules/wallet/deposit-modal/personal-wallet/not-connected'
import Step1 from '@/modules/wallet/deposit-modal/personal-wallet/step1'
import Step2 from '@/modules/wallet/deposit-modal/personal-wallet/step2'
import Step3 from '@/modules/wallet/deposit-modal/personal-wallet/step3'
import walletController from '@/modules/wallet/services/wallet-controller'
import CommunityStore from '@/store/local/community'
import { NegativeButton, PositiveButton } from '@/widgets/buttons'
import { HorizontalBetween, HorizontalFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { TextSm } from '@/widgets/text'
import { CheckIcon } from '@heroicons/react/24/outline'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Border = tw(VerticalFullWidth)`
  border
  border-solid
  border-gray-200
  rounded-lg
  h-[135px]
  p-5
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

const ContentBox = tw.div`
  p-6
  w-full
`

const PersonalWallet: FC<{
  onClose: () => void
}> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const selectedAccount = CommunityStore.useStoreState((state) => state.selectedAccount)
  const walletAddress = CommunityStore.useStoreState((state) => state.walletAddress)
  const amount = CommunityStore.useStoreState((state) => state.depositAmount)
  const switchedChain = CommunityStore.useStoreState((state) => state.switchedChain)

  const checkConnectMetamask = async () => {
    const isConnected = await walletController.checkMetamaskConnected()
    if (isConnected) setCurrentStep(1)
  }

  useEffect(() => {
    checkConnectMetamask()
  }, [])

  const checkCanNext = () => {
    switch (currentStep) {
      case 1:
        if (switchedChain) return true
        return false
      case 2:
        if (selectedAccount) return true
        return false
      case 3:
        if (amount !== 0) return true
        return false
      default:
        return false
    }
  }
  const next = async () => {
    if (!checkCanNext()) return
    if (currentStep < 3) setCurrentStep(currentStep + 1)
    else {
      await walletController.deposit(walletAddress, selectedAccount, amount)
      onClose()
    }
  }

  const prev = async () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <NotConnected />
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
    <>
      {currentStep !== 0 && (
        <>
          <StepListContainer>
            <StepListBox>
              {[1, 2, 3].map((step) => (
                <StepBox active={currentStep - 1 >= step} isLast={step === 3}>
                  <StepContent active={currentStep >= step}>
                    {step < currentStep ? <CheckIcon className='w-7 h-7' /> : step}
                  </StepContent>
                </StepBox>
              ))}
            </StepListBox>
          </StepListContainer>
          <TextStepList>
            <TextSm> Switch Chain </TextSm>
            <TextSm> Select Wallet </TextSm>
            <TextSm> Choose Amount </TextSm>
          </TextStepList>
        </>
      )}

      <ContentBox>
        <Border className={currentStep === 0 ? 'bg-[#F973160D]' : ''}>{renderContent()}</Border>
      </ContentBox>
      {currentStep !== 0 && (
        <HorizontalBetween className='px-6'>
          <NegativeButton onClick={() => prev()} block={currentStep === 1}>
            Prev
          </NegativeButton>

          <PositiveButton onClick={() => next()} block={!checkCanNext()}>
            {currentStep === 3 ? 'Done' : 'Next'}
          </PositiveButton>
        </HorizontalBetween>
      )}
    </>
  )
}

export default PersonalWallet
