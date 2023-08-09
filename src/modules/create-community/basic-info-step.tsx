import { FC, useEffect, useState } from 'react'

import tw from 'twin.macro'
import { useDebouncedCallback } from 'use-debounce'

import { getCommunityApi } from '@/api/communitiy'
import { ErrorCodes } from '@/constants/code.const'
import { Main, NextButton, Title } from '@/modules/create-community/mini-widget'
import NewCommunityStore from '@/store/local/new-community'
import { MultipleTextField, TextField } from '@/widgets/form'
import { VerticalFullWidth } from '@/widgets/orientation'
import { LabelInput, RequiredText, SmallText } from '@/widgets/text'

const DisplayNameRegex = /^[^\\/?%*:|"<>.]{4,}$/
const HandleRegex = /^$|^[a-z0-9_]{4,32}$/

const StartText = tw(SmallText)`text-start`

const GapVertical = tw(VerticalFullWidth)`gap-2`

const HandleNameInput: FC<{ onValidChange: (val: boolean) => void }> = ({ onValidChange }) => {
  const [isValid, setValid] = useState<boolean | undefined>(undefined)
  const [msg, setMsg] = useState<string>('')
  const urlName = NewCommunityStore.useStoreState((state) => state.logoUrl)

  const setUrlName = NewCommunityStore.useStoreActions((action) => action.setHandle)

  // Handler
  const debounced = useDebouncedCallback(async (value: string) => {
    const checkValid = await checkUserUrlValid()
    setValid(checkValid)
    onValidChange(checkValid)
  }, 300)

  const onChangeUrlName = (e: string) => {
    setUrlName(e)

    if (e.length >= 4) {
      debounced(e)
    } else {
      setValid(false)
      onValidChange(false)
    }

    if (e.length === 0) {
      setValid(undefined)
      onValidChange(true)
    }
  }

  const checkUserUrlValid = async (): Promise<boolean> => {
    try {
      if (!HandleRegex.test(urlName)) {
        return false
      }

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
    <GapVertical>
      <TextField
        value={urlName}
        onChange={(e) => onChangeUrlName(e.target.value)}
        placeholder='The url name of the quest is written here.'
        isValid={isValid}
        msg={msg}
      />
      <StartText>
        {"Handle should contain only characters from a->z, 0->9, '_' and must " +
          'be between 4 and 32 characters in length'}
      </StartText>
    </GapVertical>
  )
}

const DisplayNameInput: FC<{ onValidChange: (val: boolean) => void }> = ({ onValidChange }) => {
  const title = NewCommunityStore.useStoreState((state) => state.displayName)
  const setTitle = NewCommunityStore.useStoreActions((action) => action.setDisplayName)

  const [valid, setValid] = useState<boolean>(false)

  useEffect(() => {
    if (DisplayNameRegex.test(title)) {
      setValid(true)
      onValidChange(true)
    } else {
      setValid(false)
      onValidChange(false)
    }
  }, [title])

  return (
    <VerticalFullWidth>
      <TextField
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        placeholder='The name of the quest is written here.'
        isValid={valid}
      />
    </VerticalFullWidth>
  )
}

const BasicInfo: FC = () => {
  // hook
  const [validDisplayName, setValidDisplayName] = useState<boolean>(false)
  const [validHandle, setHandleValid] = useState<boolean>(true)

  // data
  const description = NewCommunityStore.useStoreState((state) => state.introduction)

  //action
  const setDescription = NewCommunityStore.useStoreActions((action) => action.setIntroduction)

  const onValidDisplayChange = (value: boolean) => {
    setValidDisplayName(value)
  }

  const onValidHandleChange = (value: boolean) => {
    setHandleValid(value)
  }

  return (
    <Main>
      <Title>{'👋 Create your community'}</Title>
      <LabelInput>
        {'DISPLAY NAME'}
        <RequiredText>{'*'}</RequiredText>
      </LabelInput>
      <DisplayNameInput onValidChange={onValidDisplayChange} />
      <LabelInput>{'XQUEST HANDLE'}</LabelInput>
      <HandleNameInput onValidChange={onValidHandleChange} />
      <LabelInput>{'DESCRIPTION'}</LabelInput>
      <MultipleTextField
        value={description}
        required={false}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        placeholder='The description of the quest is written here.'
      />
      <NextButton block={!(validDisplayName && validHandle)} />
    </Main>
  )
}

export default BasicInfo
