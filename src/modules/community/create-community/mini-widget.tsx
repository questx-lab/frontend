import { FunctionComponent } from 'react'
import tw from 'twin.macro'

import { NewCommunityStore } from '@/store/local/new-community.store'
import { FullWidthBtn } from '@/styles/button.style'
import { Horizontal, Vertical } from '@/widgets/orientation'

export const Main = tw(Vertical)`
  gap-5
  p-5
`

export const Title = tw.span`
  text-2xl
  font-normal
  text-black
  text-start
`

export const HorizotalFlex = tw(Horizontal)`
  w-full
  gap-3
`

const BackBtn = tw.button`
  w-full
  outline-0
  bg-white
  hover:bg-gray-200
  rounded-lg
  border
  border-gray-300
  border-solid
  py-2
  text-gray-700
  font-medium
  text-lg
`

export const NextButton: FunctionComponent<{ block?: boolean }> = ({
  block = false,
}) => {
  const currentStep = NewCommunityStore.useStoreState(
    (state) => state.currentStep
  )

  // action
  const setCurrentStep = NewCommunityStore.useStoreActions(
    (action) => action.setCurrentStep
  )

  return (
    <>
      <FullWidthBtn
        disabled={block}
        block={block}
        onClick={() => {
          setCurrentStep(currentStep + 1)
        }}
      >
        {'Next'}
      </FullWidthBtn>
    </>
  )
}

export const BackButton: FunctionComponent = () => {
  const currentStep = NewCommunityStore.useStoreState(
    (state) => state.currentStep
  )

  // action
  const setCurrentStep = NewCommunityStore.useStoreActions(
    (action) => action.setCurrentStep
  )

  return (
    <>
      <BackBtn onClick={() => setCurrentStep(currentStep - 1)}>
        {'Back'}
      </BackBtn>
    </>
  )
}
