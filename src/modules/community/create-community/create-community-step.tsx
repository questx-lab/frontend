import { FunctionComponent, useState } from 'react'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import tw from 'twin.macro'

import { newCommunityApi } from '@/app/api/client/community'
import {
  BackButton,
  HorizotalFlex,
  Title,
} from '@/modules/community/create-community/mini-widget'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { LabelInput } from '@/styles/input.style'
import { ReqNewCommunity } from '@/utils/type'
import { PositiveButton } from '@/widgets/button'
import { TextField } from '@/widgets/form'
import { Vertical } from '@/widgets/orientation'

const Main = tw(Vertical)`
  gap-5
  p-5
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

export const CreateCommunityStep: FunctionComponent = () => {
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

  // hook
  let [loading, setLoading] = useState<boolean>(false)
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
      toast.error('Server error')
    }
  }

  const LoadingBtn: FunctionComponent = () => {
    if (loading) {
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
        <BackButton />
        <PositiveButton isFull={true} loading={loading} onClick={onDone}>
          Done
        </PositiveButton>
      </HorizotalFlex>
    </Main>
  )
}
