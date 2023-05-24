import { FunctionComponent } from 'react'
import tw from 'twin.macro'

import { NewCommunityStore } from '@/store/local/new-community.store'
import { FullWidthBtn } from '@/styles/button.style'

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
