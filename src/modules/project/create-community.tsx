import { FunctionComponent, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Dropzone from 'react-dropzone'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import tw from 'twin.macro'

import { newProjectApi } from '@/app/api/client/project'
import {
  NewCommunityDescribeSizeMap,
  NewCommunityStage,
  NewCommunityStageMap,
  NewCommunityStep,
  NewCommunityTypeShare,
  NewCommunityTypeShareMap,
} from '@/constants/project.const'
import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { FullWidthBtn } from '@/styles/button.style'
import { LabelInput, RequireSignal } from '@/styles/input.style'
import { ReqNewProject } from '@/types/project.type'
import { MultipleTextField, TextField } from '@/widgets/form'
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

const Main = tw.div`
  flex
  flex-col
  gap-5
  p-5
  justify-start
  items-start
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

const Header = tw.div`
  w-full
  flex
  flex-row
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

const Card = tw.div`
  w-full
  flex
  flex-col
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

const HorizotalFlex = tw.div`
  flex
  flex-row
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

const InputOtherFirstStep: FunctionComponent = () => {
  // data
  const stageCheckBoxQuiz = NewCommunityStore.useStoreState(
    (state) => state.stageCheckBoxQuiz
  )
  const inputOtherStage = NewCommunityStore.useStoreState(
    (state) => state.inputOtherStage
  )
  // action
  const setInputOtherStage = NewCommunityStore.useStoreActions(
    (action) => action.setInputOtherStage
  )

  if (stageCheckBoxQuiz === NewCommunityStage.OTHER) {
    return (
      <TextField
        required
        placeholder=''
        value={inputOtherStage}
        errorMsg='Please input your project currently'
        onChange={(e) => setInputOtherStage(e.target.value)}
      />
    )
  }

  return <></>
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

const FourthStep: FunctionComponent = () => {
  // data
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

  // hook
  let [isLoading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  // handler
  const onDone = async () => {
    setLoading(true)
    try {
      const payload: ReqNewProject = {
        name: title,
        introduction: description,
      }

      const data = await newProjectApi(payload)
      if (data.error) {
        toast.error(data.error)
      } else {
        router.push(RouterConst.PROJECT + data.data?.id + '/create')
      }
    } catch (error) {
      setLoading(false)
      toast.error('Server error')
    }
  }

  const onBack = () => {
    setCurrentStep(NewCommunityStep.THIRD)
  }

  const LoadingBtn: FunctionComponent = () => {
    if (isLoading) {
      return <MoonLoader color='#fff' loading speedMultiplier={0.8} size={25} />
    }
    return <>{'Done'}</>
  }

  return (
    <Main>
      <Title>{'How did you hear of us?'}</Title>
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

const ThirdStep: FunctionComponent = () => {
  // data
  const typeShareQuiz = NewCommunityStore.useStoreState(
    (state) => state.typeShareQuiz
  )
  const inputOtherTypeShare = NewCommunityStore.useStoreState(
    (state) => state.inputOtherTypeShare
  )

  // action
  const setTypeShareQuiz = NewCommunityStore.useStoreActions(
    (action) => action.setTypeShareQuiz
  )

  const setCurrentStep = NewCommunityStore.useStoreActions(
    (action) => action.setCurrentStep
  )

  // handler
  const onNext = () => {
    setCurrentStep(NewCommunityStep.FOURTH)
  }

  const onBack = () => {
    setCurrentStep(NewCommunityStep.SECOND)
  }
  const renderItems = Array.from(NewCommunityTypeShareMap.values()).map(
    (stage, i) => (
      <ListItem className='p-0' key={i}>
        <Label htmlFor={stage}>
          <ListItemPrefix className='mr-3'>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setTypeShareQuiz(i)
                }
              }}
              checked={typeShareQuiz === i}
              id={stage}
              ripple={false}
            />
          </ListItemPrefix>
          <StageTitle>{stage}</StageTitle>
        </Label>
      </ListItem>
    )
  )

  const active =
    typeShareQuiz === NewCommunityTypeShare.OTHER && inputOtherTypeShare === ''

  return (
    <Main>
      <Title>
        {
          'What types of content do you plan to share with your community? (Select all that apply)'
        }
      </Title>
      <Card className='w-full shadow-0'>
        <List>{renderItems}</List>
        <InputOtherThirdStep />
      </Card>
      <HorizotalFlex>
        <BackBtn onClick={onBack}>{'Back'}</BackBtn>
        <FullWidthBtn block={active} disabled={active} onClick={onNext}>
          {'Next'}
        </FullWidthBtn>
      </HorizotalFlex>
    </Main>
  )
}

const SecondStep: FunctionComponent = () => {
  // data
  const describeSizeQuiz = NewCommunityStore.useStoreState(
    (state) => state.describeSizeQuiz
  )

  // action
  const setDescribeSizeQuiz = NewCommunityStore.useStoreActions(
    (action) => action.setDescribeSizeQuiz
  )
  const setCurrentStep = NewCommunityStore.useStoreActions(
    (action) => action.setCurrentStep
  )

  // handler
  const onNext = () => {
    setCurrentStep(NewCommunityStep.THIRD)
  }

  const onBack = () => {
    setCurrentStep(NewCommunityStep.FIRST)
  }

  const renderItems = Array.from(NewCommunityDescribeSizeMap.values()).map(
    (stage, i) => (
      <ListItem className='p-0' key={i}>
        <Label htmlFor={stage}>
          <ListItemPrefix className='mr-3'>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setDescribeSizeQuiz(i)
                }
              }}
              checked={describeSizeQuiz === i}
              id={stage}
              ripple={false}
            />
          </ListItemPrefix>
          <StageTitle>{stage}</StageTitle>
        </Label>
      </ListItem>
    )
  )

  return (
    <Main>
      <Title>{'How would you describe the size of your project team?'}</Title>
      <Card className='w-full shadow-0'>
        <List>{renderItems}</List>
      </Card>
      <HorizotalFlex>
        <BackBtn onClick={onBack}>{'Back'}</BackBtn>
        <FullWidthBtn onClick={onNext}>{'Next'}</FullWidthBtn>
      </HorizotalFlex>
    </Main>
  )
}

const FirstStep: FunctionComponent = () => {
  // data
  const stageCheckBoxQuiz = NewCommunityStore.useStoreState(
    (state) => state.stageCheckBoxQuiz
  )
  const inputOtherStage = NewCommunityStore.useStoreState(
    (state) => state.inputOtherStage
  )

  // action
  const setStageCheckBoxQuiz = NewCommunityStore.useStoreActions(
    (action) => action.setStageCheckBoxQuiz
  )
  const setCurrentStep = NewCommunityStore.useStoreActions(
    (action) => action.setCurrentStep
  )

  // handler
  const onNext = () => {
    setCurrentStep(NewCommunityStep.SECOND)
  }

  const onBack = () => {
    setCurrentStep(NewCommunityStep.BEGIN)
  }

  const renderItems = Array.from(NewCommunityStageMap.values()).map(
    (stage, i) => (
      <ListItem className='p-0' key={i}>
        <Label htmlFor={stage}>
          <ListItemPrefix className='mr-3'>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setStageCheckBoxQuiz(i)
                }
              }}
              checked={stageCheckBoxQuiz === i}
              id={stage}
              ripple={false}
            />
          </ListItemPrefix>
          <StageTitle>{stage}</StageTitle>
        </Label>
      </ListItem>
    )
  )

  const active =
    stageCheckBoxQuiz === NewCommunityStage.OTHER && inputOtherStage === ''

  return (
    <Main>
      <Title>{'What stage is your project currently in?'}</Title>
      <Card className='w-full shadow-0'>
        <List>{renderItems}</List>
        <InputOtherFirstStep />
      </Card>
      <HorizotalFlex>
        <BackBtn onClick={onBack}>{'Back'}</BackBtn>
        <FullWidthBtn block={active} disabled={active} onClick={onNext}>
          {'Next'}
        </FullWidthBtn>
      </HorizotalFlex>
    </Main>
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
      <Dropzone onDrop={(acceptedFiles) => {}}>
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
      <FullWidthBtn
        disabled={title === ''}
        block={title === ''}
        onClick={onNext}
      >
        {'Next'}
      </FullWidthBtn>
    </Main>
  )
}

const RenderStep: FunctionComponent = () => {
  //data
  const currentStep = NewCommunityStore.useStoreState(
    (state) => state.currentStep
  )

  switch (currentStep) {
    case NewCommunityStep.BEGIN:
      return <BasicInfo />
    case NewCommunityStep.FIRST:
      return <FirstStep />
    case NewCommunityStep.SECOND:
      return <SecondStep />
    case NewCommunityStep.THIRD:
      return <ThirdStep />
    case NewCommunityStep.FOURTH:
      return <FourthStep />
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
      return <TitleBox>{'QUIZ 1/4'}</TitleBox>
    case NewCommunityStep.SECOND:
      return <TitleBox>{'QUIZ 2/4'}</TitleBox>
    case NewCommunityStep.THIRD:
      return <TitleBox>{'QUIZ 3/4'}</TitleBox>
    case NewCommunityStep.FOURTH:
      return <TitleBox>{'QUIZ 4/4'}</TitleBox>
  }

  return <TitleBox>{'LET START!'}</TitleBox>
}

const CreateProject: FunctionComponent<{
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

export default CreateProject
