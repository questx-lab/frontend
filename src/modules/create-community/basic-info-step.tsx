import { Fragment, FunctionComponent, useState } from 'react'

import { useDebouncedCallback } from 'use-debounce'

import { getCommunityApi } from '@/app/api/client/communitiy'
import { ErrorCodes } from '@/constants/code.const'
import { Main, NextButton, Title } from '@/modules/create-community/mini-widget'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { LabelInput, RequireSignal } from '@/styles/input.style'
import { MultipleTextField, TextField } from '@/widgets/form'

const HandleNameBox: FunctionComponent = () => {
  const [isValid, setValid] = useState<boolean | undefined>(undefined)
  const [msg, setMsg] = useState<string>('')
  const urlName = NewCommunityStore.useStoreState((state) => state.urlName)

  const setUrlName = NewCommunityStore.useStoreActions((action) => action.setUrlName)

  // Handler
  const debounced = useDebouncedCallback(async (value: string) => {
    const checkValid = await checkUserUrlValid()
    setValid(checkValid)
  }, 300)

  const onChangeUrlName = (e: string) => {
    setUrlName(e)
    if (e.length > 4) {
      debounced(e)
    } else {
      setValid(undefined)
      setMsg('')
    }
  }

  const checkUserUrlValid = async (): Promise<boolean> => {
    try {
      const data = await getCommunityApi(urlName)
      if (data.code === ErrorCodes.RECORD_NOT_FOUND) {
        setMsg('Url name is valid')
        return true
      } else {
        setMsg('Url name is existed')
      }
    } catch (error) {
      return false
    }
    return false
  }

  return (
    <Fragment>
      <LabelInput>{'XQUEST HANDLE'}</LabelInput>
      <TextField
        value={urlName}
        onChange={(e) => onChangeUrlName(e.target.value)}
        placeholder='The url name of the quest is written here.'
        isValid={isValid}
        msg={msg}
        min={4}
      />
    </Fragment>
  )
}

export const BasicInfo: FunctionComponent = () => {
  // data
  const title = NewCommunityStore.useStoreState((state) => state.title)
  const description = NewCommunityStore.useStoreState((state) => state.description)

  //action
  const setTitle = NewCommunityStore.useStoreActions((action) => action.setTitle)
  const setDescription = NewCommunityStore.useStoreActions((action) => action.setDescription)

  return (
    <Main>
      <Title>{'👋 Create your community'}</Title>
      <LabelInput>
        {'DISPLAY NAME'}
        <RequireSignal>{'*'}</RequireSignal>
      </LabelInput>
      <TextField
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        placeholder='The name of the quest is written here.'
      />
      <HandleNameBox />
      <LabelInput>{'DESCRIPTION'}</LabelInput>
      <MultipleTextField
        value={description}
        required={false}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        placeholder='The description of the quest is written here.'
      />
      <NextButton block={title === ''} />
    </Main>
  )
}
