import { FunctionComponent } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { NewCommunityStep } from '@/constants/common.const'
import { BasicInfo } from '@/modules/community/create-community/basic-info-step'
import { CreateCommunityStep } from '@/modules/community/create-community/create-community-step'
import { SetTwitterDiscordStep } from '@/modules/community/create-community/set-twitter-discord-step'
import { UploadImageStep } from '@/modules/community/create-community/upload-image-step'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { Horizontal } from '@/widgets/orientation'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Body = tw.div`
  w-full
  h-full
`

const Wrap = styled(Dialog.Panel)(
  tw`
  w-1/3
  max-xl:w-2/3
  bg-white
  text-center
  align-middle
  overflow-hidden
  shadow-xl
  transition-all
  flex
  flex-col
  justify-start
  items-center
  rounded-lg
  `
)

const Header = tw(Horizontal)`
  w-full
  justify-between
  items-center
  px-4
  py-3
  text-2xl
  font-normal
  text-black
  border
  border-solid
  border-gray-200
`

const TitleBox = tw.div`
  px-4
  py-1
  bg-teal
  rounded-full
  text-sm
  font-medium
  text-white
`

const RenderStep: FunctionComponent = () => {
  //data
  const currentStep = NewCommunityStore.useStoreState(
    (state) => state.currentStep
  )

  switch (currentStep) {
    case NewCommunityStep.BEGIN:
      return <BasicInfo />
    case NewCommunityStep.FIRST:
      return <SetTwitterDiscordStep />
    case NewCommunityStep.SECOND:
      return <CreateCommunityStep />
    case NewCommunityStep.THIRD:
      return <UploadImageStep />
  }

  return <BasicInfo />
}

const RenderTitle: FunctionComponent = () => {
  //data
  const currentStep = NewCommunityStore.useStoreState(
    (state) => state.currentStep
  )

  return <TitleBox>{`STEP ${currentStep}/4`}</TitleBox>
}

const CreateCommunity: FunctionComponent<{
  setOpen: (value: boolean) => void
}> = ({ setOpen }) => {
  return (
    <Wrap>
      <NewCommunityStore.Provider>
        <Header>
          <RenderTitle />
          <XMarkIcon
            onClick={() => setOpen(false)}
            className='w-7 h-7 cursor-pointer'
          />
        </Header>
        <Body>
          <RenderStep />
        </Body>
      </NewCommunityStore.Provider>
    </Wrap>
  )
}

export default CreateCommunity
