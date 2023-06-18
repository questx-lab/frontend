import { FC, useState } from 'react'

import tw from 'twin.macro'

import {
  BackButton,
  HorizotalFullWidth,
  Main,
  NextButton,
  Title,
} from '@/modules/create-community/mini-widget'
import NewCommunityStore from '@/store/local/new-community'
import { isValidEmail } from '@/utils/validation'
import { TextField } from '@/widgets/form'
import { HorizontalCenter } from '@/widgets/orientation'
import { NormalText, RequiredText, TextSm } from '@/widgets/text'

const Label = tw.label`
  flex
  items-center
  w-full
  cursor-pointer
`

const SocialBoxInput = tw(HorizontalCenter)`
  w-full
  border
  border-solid
  border-gray-300
  rounded-lg
  h-14
`

const EmptyBox = tw(HorizontalCenter)`
  h-full
  bg-gray-50
  border-r
  border-solid
  border-gray-300
  w-14
  flex
  rounded-l-lg
  text-lg
  font-normal
  text-gray-400
`

const SocialInput = tw.input`
  px-4
  outline-0
  border-0
  ring-0
  w-full
  h-full
  text-lg
  rounded-lg
`

const ErrorText = tw(TextSm)`
  text-start
  text-danger-700
`

const SetTwitterDiscordStep: FC = () => {
  // data
  const twitterUrl = NewCommunityStore.useStoreState((state) => state.twitterUrl)
  const websiteUrl = NewCommunityStore.useStoreState((state) => state.websiteUrl)
  const email = NewCommunityStore.useStoreState((state) => state.email)
  const currentStep = NewCommunityStore.useStoreState((state) => state.currentStep)

  // action
  const setTwitterUrl = NewCommunityStore.useStoreActions((action) => action.setTwitterUrl)
  const setWebsiteUrl = NewCommunityStore.useStoreActions((action) => action.setWebsiteUrl)
  const setEmail = NewCommunityStore.useStoreActions((action) => action.setEmail)
  const setCurrentStep = NewCommunityStore.useStoreActions((action) => action.setCurrentStep)

  const [showEmailError, setShowEmailError] = useState<boolean>(false)

  const onNextClicked = () => {
    // if (!isValidEmail(email)) {
    //   setShowEmailError(true)
    //   return
    // }

    setCurrentStep(currentStep + 1)
  }

  return (
    <Main>
      <Title>{'Do you want to provide more information about yourself?'}</Title>
      <NormalText className='text-start'>
        {
          'Please provide additional information about yourself in order to connect with others in the community.'
        }
      </NormalText>
      <Label>{'TWITTER'}</Label>
      <SocialBoxInput>
        <EmptyBox>{'@'}</EmptyBox>
        <SocialInput
          value={twitterUrl}
          onChange={(e) => setTwitterUrl(e.target.value)}
          placeholder='Username'
        />
      </SocialBoxInput>
      {/* <Label>
        {'EMAIL'}
        <RequiredText>{'*'}</RequiredText>
      </Label>
      <TextField value={email} onChange={(e) => setEmail(e.target.value)} placeholder='' />
      {showEmailError && (
        <ErrorText>
          {
            'A valid email is required for new community approval (we will never sell your private info)'
          }
        </ErrorText>
      )} */}
      <Label>{'WEBSITE'}</Label>
      <TextField
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        placeholder=''
      />
      <HorizotalFullWidth>
        <BackButton />
        <NextButton onClick={onNextClicked} />
      </HorizotalFullWidth>
    </Main>
  )
}

export default SetTwitterDiscordStep
