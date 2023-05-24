import { FunctionComponent, useState } from 'react'

import { useStoreActions } from 'easy-peasy'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Dropzone from 'react-dropzone'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import tw from 'twin.macro'

import {
  getMyCommunitiesApi,
  newCommunityApi,
} from '@/app/api/client/community'
import {
  ButtonSocialType,
  ConnectSocialPlatformEnum,
  NewCommunityStage,
  NewCommunityStep,
  NewCommunityTypeShare,
} from '@/constants/common.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { GlobalStoreModel } from '@/store/store'
import { FullWidthBtn } from '@/styles/button.style'
import { LabelInput, RequireSignal } from '@/styles/input.style'
import { SocialBtn } from '@/styles/quest-detail.style'
import { uploadFileForCommunity } from '@/utils/file'
import { ReqNewCommunity } from '@/utils/type'
import { MultipleTextField, TextField } from '@/widgets/form'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react'

const Body = tw.div`
  w-full
  h-full
`

const Title = tw.span`
  text-2xl
  font-normal
  text-black
  text-start
`

const Main = tw(Vertical)`
  gap-5
  p-5
`

const SectionUploadImg = tw.section`
  border-2
  border-dotted
  rounded-lg
  justify-center
  items-center
  outline-0
`

const UploadInput = tw.input`
  outline-0
  ring-0
  outline-offset-0
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

const DescriptionText = tw.span`
  text-lg
  font-normal
  text-gray-700
  text-start
`

const WarningText = tw.span`
  text-sm
  font-normal
  text-warning-700
  text-start
`

const Card = tw(Vertical)`
  w-full
`

const Label = tw.label`
  py-2
  flex
  items-center
  w-full
  cursor-pointer
`

const StageTitle = tw.span`
  font-normal
  text-gray-700
  text-lg
`

const HorizotalFlex = tw(Horizontal)`
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

export const UploadImgBox = tw(Horizontal)`
  items-end
  gap-3
`

export const RemoveAvt = tw.button`
  text-sm
  text-danger-700
  py-1
  rounded-lg
  border
  border-solid
  border
  border-danger-400
  bg-danger-100
  hover:bg-danger-700
  hover:text-white
  outline-0
  px-4
`

const NextButton: FunctionComponent<{ block?: boolean }> = ({
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

const BackButton: FunctionComponent = () => {
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

const InputOtherThirdStep: FunctionComponent = () => {
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

// ********* CREATE COMMUNITY STEP ***********
const CreateCommunityStep: FunctionComponent = () => {
  // data
  const currentStep = NewCommunityStore.useStoreState(
    (state) => state.currentStep
  )
  const inviteCode = NewCommunityStore.useStoreState(
    (state) => state.inviteCode
  )
  const title = NewCommunityStore.useStoreState((state) => state.title)
  const description = NewCommunityStore.useStoreState(
    (state) => state.description
  )

  // action
  const setCurrentStep = NewCommunityStore.useStoreActions(
    (action) => action.setCurrentStep
  )
  const setInviteCode = NewCommunityStore.useStoreActions(
    (action) => action.setInviteCode
  )
  const setCreatedCommunityId = NewCommunityStore.useStoreActions(
    (action) => action.setCreatedCommunityId
  )
  const setProjectCollab = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectCollab
  )

  // hook
  let [isLoading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  // handler
  const onDone = async () => {
    setLoading(true)
    try {
      const payload: ReqNewCommunity = {
        name: title,
        introduction: description,
      }

      const data = await newCommunityApi(payload)
      if (data.error) {
        toast.error(data.error)
      }
      if (!data || !data.data || !data.data.id) {
        toast.error('Cannot create new community')
      } else {
        setCurrentStep(currentStep + 1)
        setCreatedCommunityId(data.data.id)
      }
    } catch (error) {
      setLoading(false)
      console.log('There is error = ', error)
      toast.error('Server error')
    }
  }

  const onBack = () => {
    setCurrentStep(NewCommunityStep.FOURTH)
  }

  const LoadingBtn: FunctionComponent = () => {
    if (isLoading) {
      return <MoonLoader color='#fff' loading speedMultiplier={0.8} size={25} />
    }
    return <>{'Done'}</>
  }

  return (
    <Main>
      <Title>{'How did you hear about us?'}</Title>
      <DescriptionText>
        {
          "Enter someone else's invite code so they can claim a reward. After creating a community, you can also have these codes."
        }
      </DescriptionText>
      <LabelInput>{'INVITE CODE'}</LabelInput>
      <TextField
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
        placeholder='Code Invite'
      />
      <WarningText>
        {"* If you don't have a invite code, leave the input field blank."}
      </WarningText>
      <HorizotalFlex>
        <BackBtn onClick={onBack}>{'Back'}</BackBtn>
        <FullWidthBtn onClick={onDone}>
          <LoadingBtn />
        </FullWidthBtn>
      </HorizotalFlex>
    </Main>
  )
}

// ********* FOURTH STEP ***********
const SetTwitterDiscordStep: FunctionComponent = () => {
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

const AvatarUpload: FunctionComponent = () => {
  // data
  const avatar = NewCommunityStore.useStoreState((state) => state.avatar)

  // action
  const setAvatar = NewCommunityStore.useStoreActions(
    (action) => action.setAvatar
  )

  // handler
  const onRemoveImg = () => {
    setAvatar([])
  }

  if (avatar.length) {
    return (
      <UploadImgBox>
        <Image
          width={100}
          height={100}
          src={(avatar[0] as any).preview}
          alt={'Community avatar'}
        />
        <RemoveAvt onClick={onRemoveImg}>{'Remove'}</RemoveAvt>
      </UploadImgBox>
    )
  }

  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        setAvatar(
          acceptedFiles.map((upFile) =>
            Object.assign(upFile, {
              preview: URL.createObjectURL(upFile),
            })
          )
        )
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <SectionUploadImg
          {...getRootProps({
            className: 'dropzone outline-none cursor-pointer',
          })}
        >
          <UploadInput {...getInputProps()} />
          <Image
            width={100}
            height={100}
            src={StorageConst.UPLOAD_IMG.src}
            alt={StorageConst.UPLOAD_IMG.alt}
          />
        </SectionUploadImg>
      )}
    </Dropzone>
  )
}

const BasicInfo: FunctionComponent = () => {
  // data
  const title = NewCommunityStore.useStoreState((state) => state.title)
  const description = NewCommunityStore.useStoreState(
    (state) => state.description
  )

  //action
  const setCurrentStep = NewCommunityStore.useStoreActions(
    (action) => action.setCurrentStep
  )
  const setTitle = NewCommunityStore.useStoreActions(
    (action) => action.setTitle
  )
  const setDescription = NewCommunityStore.useStoreActions(
    (action) => action.setDescription
  )

  const onNext = () => {
    setCurrentStep(NewCommunityStep.FIRST)
  }

  return (
    <Main>
      <Title>{'👋 Create your community'}</Title>
      <LabelInput>
        {'NAME'}
        <RequireSignal>{'*'}</RequireSignal>
      </LabelInput>
      <TextField
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        placeholder='The name of the quest is written here.'
      />
      <LabelInput>{'DESCRIPTION'}</LabelInput>
      <MultipleTextField
        value={description}
        required={false}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        placeholder='The description of the quest is written here.'
      />
      <LabelInput>{'UPLOAD COMMUNITY IMAGE'}</LabelInput>
      <AvatarUpload />

      <NextButton block={title === ''} />
    </Main>
  )
}

const UploadImageStep: FunctionComponent = () => {
  // data
  const avatar = NewCommunityStore.useStoreState((state) => state.avatar)
  const createdCommunityId = NewCommunityStore.useStoreState(
    (state) => state.createdCommunityId
  )

  // action
  const setProjectCollab = useStoreActions<GlobalStoreModel>(
    (action) => action.setProjectCollab
  )

  const router = useRouter()

  const getMyProjects = async () => {
    try {
      const projects = await getMyCommunitiesApi()
      if (projects.error) {
        toast.error('Error when get your projects')
      } else {
        if (projects.data?.collaborators) {
          setProjectCollab(projects.data?.collaborators)
        }
      }
    } catch (error) {
      toast.error('Server error')
    }
  }

  const onUploadFile = async () => {
    const tuple = await uploadFileForCommunity(avatar[0], createdCommunityId)
    if (tuple.error) {
      toast.error(tuple.error)
    } else {
      console.log('tuple.value = ', tuple.value)
      getMyProjects()
      router.push(RouterConst.PROJECT + createdCommunityId + '/create')
    }
  }

  return (
    <>
      <LabelInput>{'UPLOAD COMMUNITY IMAGE'}</LabelInput>
      <AvatarUpload />
      <FullWidthBtn onClick={onUploadFile}>
        Upload Community Profile
      </FullWidthBtn>
    </>
  )
}
const RenderStep: FunctionComponent = () => {
  //data
  const currentStep = NewCommunityStore.useStoreState(
    (state) => state.currentStep
  )

  const setCurrentStep = NewCommunityStore.useStoreActions(
    (action) => action.setCurrentStep
  )
  console.log('RenderStep: setCurrentStep = ', setCurrentStep)

  switch (currentStep) {
    case NewCommunityStep.BEGIN:
      return <BasicInfo />
    case NewCommunityStep.FIRST:
      return <SetTwitterDiscordStep />
    case NewCommunityStep.SECOND:
      return <CreateCommunityStep />
    case NewCommunityStep.THIRD:
      console.log('Third step.....')
      return <UploadImageStep />
  }

  return <BasicInfo />
}

const RenderTitle: FunctionComponent = () => {
  //data
  const currentStep = NewCommunityStore.useStoreState(
    (state) => state.currentStep
  )

  switch (currentStep) {
    case NewCommunityStep.BEGIN:
      return <TitleBox>{'LET START!'}</TitleBox>
    case NewCommunityStep.FIRST:
      return <TitleBox>{'QUIZ 1/5'}</TitleBox>
    case NewCommunityStep.SECOND:
      return <TitleBox>{'QUIZ 2/5'}</TitleBox>
    case NewCommunityStep.THIRD:
      return <TitleBox>{'QUIZ 3/5'}</TitleBox>
    case NewCommunityStep.FOURTH:
      return <TitleBox>{'QUIZ 4/5'}</TitleBox>
    case NewCommunityStep.FIFTH:
      return <TitleBox>{'QUIZ 5/5'}</TitleBox>
  }

  return <TitleBox>{'LET START!'}</TitleBox>
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
