import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import {
  BackButton,
  HorizotalFlex,
  Main,
  NextButton,
  Title,
} from '@/modules/community/create-community/mini-widget'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { TextField } from '@/widgets/form'
import { HorizontalCenter } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'

const Label = tw.label`
  py-2
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

export const SetTwitterDiscordStep: FunctionComponent = () => {
  // data
  const twitterUrl = NewCommunityStore.useStoreState(
    (state) => state.twitterUrl
  )
  const websiteUrl = NewCommunityStore.useStoreState(
    (state) => state.websiteUrl
  )

  // action
  const setTwitterUrl = NewCommunityStore.useStoreActions(
    (action) => action.setTwitterUrl
  )
  const setWebsiteUrl = NewCommunityStore.useStoreActions(
    (action) => action.setWebsiteUrl
  )

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
      <Label>{'WEBSITE'}</Label>
      <TextField
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        placeholder=''
      />
      <HorizotalFlex>
        <BackButton />
        <NextButton />
      </HorizotalFlex>
    </Main>
  )
}
