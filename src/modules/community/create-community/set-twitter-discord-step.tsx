import { FunctionComponent, useState } from 'react'

import tw from 'twin.macro'

import {
  ButtonSocialType,
  ConnectSocialPlatformEnum,
  NewCommunityStep,
  NewCommunityTypeShare,
} from '@/constants/common.const'
import {
  BackButton,
  HorizotalFlex,
  Main,
  NextButton,
  Title,
} from '@/modules/community/create-community/mini-widget'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { SocialBtn } from '@/styles/quest-detail.style'
import { TextField } from '@/widgets/form'
import { Vertical } from '@/widgets/orientation'
import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react'

const StageTitle = tw.span`
  font-normal
  text-gray-700
  text-lg
`

const Label = tw.label`
  py-2
  flex
  items-center
  w-full
  cursor-pointer
`

const Card = tw(Vertical)`
  w-full
`

export const InputOtherThirdStep: FunctionComponent = () => {
  // data
  const typeShareQuiz = NewCommunityStore.useStoreState(
    (state) => state.typeShareQuiz
  )
  const inputOtherTypeShare = NewCommunityStore.useStoreState(
    (state) => state.inputOtherTypeShare
  )
  // action
  const setInputOtherTypeShare = NewCommunityStore.useStoreActions(
    (action) => action.setInputOtherTypeShare
  )

  if (typeShareQuiz === NewCommunityTypeShare.OTHER) {
    return (
      <TextField
        required
        placeholder=''
        value={inputOtherTypeShare}
        errorMsg='Please input your other'
        onChange={(e) => setInputOtherTypeShare(e.target.value)}
      />
    )
  }

  return <></>
}

export const SetTwitterDiscordStep: FunctionComponent = () => {
  // data
  const discordUrl = NewCommunityStore.useStoreState(
    (state) => state.discordUrl
  )
  const twitterUrl = NewCommunityStore.useStoreState(
    (state) => state.twitterUrl
  )

  // action
  const setCurrentStep = NewCommunityStore.useStoreActions(
    (action) => action.setCurrentStep
  )
  const setDiscordUrl = NewCommunityStore.useStoreActions(
    (action) => action.setDiscordUrl
  )
  const setTwitterUrl = NewCommunityStore.useStoreActions(
    (action) => action.setTwitterUrl
  )

  // hook
  const [social, setSocial] = useState<string>(ConnectSocialPlatformEnum.NONE)

  // handler
  const onNext = () => {
    setCurrentStep(NewCommunityStep.FIFTH)
  }
  const onBack = () => {
    setCurrentStep(NewCommunityStep.THIRD)
  }

  const InputUrl: FunctionComponent = () => {
    switch (social) {
      case ConnectSocialPlatformEnum.DISCORD:
        return (
          <SocialBtn btnType={ButtonSocialType.DISCORD}>
            {'Connect Discord'}
          </SocialBtn>
        )
      case ConnectSocialPlatformEnum.TWITTER:
        return (
          <SocialBtn btnType={ButtonSocialType.TWITTER}>
            {'Connect Twitter'}
          </SocialBtn>
        )
    }

    return <></>
  }

  const renderItems = Array.from(Object.values(ConnectSocialPlatformEnum)).map(
    (value, i) => (
      <ListItem className='p-0 flex flex-col gap-3' key={i}>
        <Label htmlFor={value}>
          <ListItemPrefix className='mr-3'>
            <Checkbox
              checked={value === social}
              onChange={(e) => {
                if (e.target.checked) {
                  setSocial(value)
                }
              }}
              id={value}
              ripple={false}
            />
          </ListItemPrefix>
          <StageTitle>{value}</StageTitle>
        </Label>
      </ListItem>
    )
  )

  const block =
    (discordUrl === '' && social === ConnectSocialPlatformEnum.DISCORD) ||
    (twitterUrl === '' && social === ConnectSocialPlatformEnum.TWITTER)

  return (
    <Main>
      <Title>{'Connect social platform'}</Title>
      <Card className='w-full shadow-0'>
        <List>{renderItems}</List>
        <InputOtherThirdStep />
      </Card>
      <InputUrl />

      <HorizotalFlex>
        <BackButton />
        <NextButton block={block} />
      </HorizotalFlex>
    </Main>
  )
}
