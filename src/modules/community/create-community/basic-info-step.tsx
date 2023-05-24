import { FunctionComponent } from 'react'

import { AvatarUpload } from '@/modules/community/create-community/avatar-upload'
import {
  Main,
  NextButton,
  Title,
} from '@/modules/community/create-community/mini-widget'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { LabelInput, RequireSignal } from '@/styles/input.style'
import { MultipleTextField, TextField } from '@/widgets/form'

export const BasicInfo: FunctionComponent = () => {
  // data
  const title = NewCommunityStore.useStoreState((state) => state.title)
  const description = NewCommunityStore.useStoreState(
    (state) => state.description
  )

  //action
  const setTitle = NewCommunityStore.useStoreActions(
    (action) => action.setTitle
  )
  const setDescription = NewCommunityStore.useStoreActions(
    (action) => action.setDescription
  )

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
