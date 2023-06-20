import { FC } from 'react'

import tw from 'twin.macro'

import NewCommunityStore from '@/store/local/new-community'
import { PositiveButton } from '@/widgets/buttons'
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

export const HorizotalFullWidth = tw(Horizontal)`
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

export const NextButton: FC<{
  block?: boolean
  onClick?: () => void
}> = ({ block = false, onClick }) => {
  const currentStep = NewCommunityStore.useStoreState((state) => state.currentStep)

  // action
  const setCurrentStep = NewCommunityStore.useStoreActions((action) => action.setCurrentStep)

  return (
    <PositiveButton
      isFull={true}
      block={block}
      onClick={() => {
        if (onClick) {
          onClick()
        } else {
          setCurrentStep(currentStep + 1)
        }
      }}
    >
      {'Next'}
    </PositiveButton>
  )
}

export const BackButton: FC = () => {
  const currentStep = NewCommunityStore.useStoreState((state) => state.currentStep)

  // action
  const setCurrentStep = NewCommunityStore.useStoreActions((action) => action.setCurrentStep)

  return <BackBtn onClick={() => setCurrentStep(currentStep - 1)}>{'Back'}</BackBtn>
}
