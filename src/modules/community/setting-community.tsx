import { FunctionComponent, useEffect, useState } from 'react'

import Image from 'next/image'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'
import tw from 'twin.macro'

import {
  generateCommunityKeyApi,
  getCommunityApi,
  updateCommunityApi,
} from '@/app/api/client/community'
import { PanelLayout } from '@/components/layout'
import { SideEnum } from '@/constants/common.const'
import { StorageConst } from '@/constants/storage.const'
import { CommunityStore } from '@/store/local/community.store'
import { NewCommunityStore } from '@/store/local/new-community.store'
import { Divider, FullScreen } from '@/styles/common.style'
import { RequireSignal } from '@/styles/input.style'
import { Head, Tab, TabItem } from '@/styles/quest-review.style'
import { ReqUpdateCommunity } from '@/utils/type'
import { NegativeButton, PositiveButton } from '@/widgets/button'
import { MultipleTextField, TextField } from '@/widgets/form'
import {
  HorizontalEnd,
  HorizontalStartCenter,
  Vertical,
} from '@/widgets/orientation'
import { Label, NormalText, PrimaryText } from '@/widgets/text'
import { Switch } from '@headlessui/react'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'

enum SettingTab {
  GENERAL,
  API_KEY,
}

const Wrap = tw(Vertical)`
  w-4/5
  gap-3
  py-8
  px-36
`

const PublicBox = tw(HorizontalStartCenter)`
  w-full
  p-4
  border
  border-solid
  border-gray-300
  rounded-lg
  gap-3
`

const WrapBtn = tw(HorizontalEnd)`
  w-full
  gap-3
`

const PublicSwitch = styled(Switch)<{ active: boolean }>(
  ({ active = false }) => [
    active &&
      tw`
      bg-primary relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full 
      border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2
      focus-visible:ring-white focus-visible:ring-opacity-75
      `,
    !active &&
      tw`
      bg-gray-100 relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full 
      border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2
      focus-visible:ring-white focus-visible:ring-opacity-75
      `,
  ]
)

const PointSwitch = styled.div<{ active: boolean }>(({ active = false }) => [
  active &&
    tw`
  translate-x-9
  pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg 
  ring-0 transition duration-200 ease-in-out
  `,
  !active &&
    tw`
  translate-x-0
  pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg 
  ring-0 transition duration-200 ease-in-out
  `,
])

const KeyWrap = tw(HorizontalStartCenter)`
  p-3
  border
  border-solid
  border-gray-300
  rounded-lg
  gap-3
`

const ApiKey: FunctionComponent = () => {
  // hook
  const [loading, setLoading] = useState<boolean>(false)
  const [apiKey, setApiKey] = useState<string>('')

  // data
  const project = CommunityStore.useStoreState((state) => state.project)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const { error, data } = await generateCommunityKeyApi(project.id)
      if (error) {
        toast.error(error)
      } else {
        setApiKey(data?.key!)
        toast.success('Genrate key successful')
      }
    } catch (error) {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  const KeySession: FunctionComponent = () => {
    if (apiKey !== '') {
      return (
        <KeyWrap>
          {apiKey}
          <DocumentDuplicateIcon
            onClick={() => {
              navigator.clipboard.writeText(apiKey)
              toast('Copied!', {
                icon: '👏',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })
            }}
            className='h-7 w-7 hover:cursor-pointer '
          />
        </KeyWrap>
      )
    }

    return (
      <NegativeButton loading={loading} onClick={handleGenerate}>
        {'Create New API Key'}
      </NegativeButton>
    )
  }

  return (
    <Wrap>
      <NormalText>
        {'For more info about what you can do with the APT visit our doc here'}
      </NormalText>
      <KeySession />
    </Wrap>
  )
}

const General: FunctionComponent = () => {
  // hook
  const [enabled, setEnabled] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    setTitle(project.name!)
    setDescription(project.introduction!)
    setWebsiteUrl(project.website_url ?? '')
  }, [])

  // data
  const project = CommunityStore.useStoreState((state) => state.project)
  const title = NewCommunityStore.useStoreState((state) => state.title)
  const description = NewCommunityStore.useStoreState(
    (state) => state.description
  )
  const websiteUrl = NewCommunityStore.useStoreState(
    (state) => state.websiteUrl
  )

  // action
  const setTitle = NewCommunityStore.useStoreActions(
    (action) => action.setTitle
  )
  const setDescription = NewCommunityStore.useStoreActions(
    (action) => action.setDescription
  )
  const setWebsiteUrl = NewCommunityStore.useStoreActions(
    (action) => action.setWebsiteUrl
  )

  // handler
  const handleUpdate = async () => {
    setLoading(true)
    try {
      const payload: ReqUpdateCommunity = {
        id: project.id ?? '',
        name: title,
        introduction: description,
        website_url: websiteUrl,
      }
      const rs = await updateCommunityApi(payload)
      if (rs.error) {
        toast.error(rs.error)
      } else {
        toast.success('Update success')
      }
    } catch (error) {
      toast.error('Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrap>
      <Label>
        {'NAME'}
        <RequireSignal>{'*'}</RequireSignal>
      </Label>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder=''
        required
        errorMsg='This field is required'
      />
      <Label>{'DESCRIPTION'}</Label>
      <MultipleTextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder=''
        required={false}
        rows={4}
      />
      <Label>{'PROJECT IMAGE'}</Label>
      <Image
        width={250}
        height={250}
        src={StorageConst.MANTA_LOGO.src}
        alt={'avatar'}
      />
      <PrimaryText>{'*Max 5.0MB, Size 200x200px'}</PrimaryText>
      <Label>{'PUBLIC'}</Label>
      <PublicBox>
        <PublicSwitch checked={enabled} onChange={setEnabled} active={enabled}>
          <PointSwitch aria-hidden='true' active={enabled} />
        </PublicSwitch>
        <NormalText>{'anyone can see and claim the quests'}</NormalText>
      </PublicBox>
      <Label>{'WEBSITE URL'}</Label>
      <TextField
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        placeholder=''
        required={false}
        errorMsg='This field is required'
      />
      <Divider />
      <WrapBtn>
        <NegativeButton>{'Cancel'}</NegativeButton>
        <PositiveButton loading={loading} onClick={handleUpdate}>
          {'Save'}
        </PositiveButton>
      </WrapBtn>
    </Wrap>
  )
}

const SettingCommunity: FunctionComponent<{ projectId: string }> = ({
  projectId,
}) => {
  // hook
  const [tab, setTab] = useState<number>(SettingTab.GENERAL)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchProject()
  }, [])

  // action
  const setProject = CommunityStore.useStoreActions(
    (action) => action.setProject
  )

  const fetchProject = async () => {
    try {
      const rs = await getCommunityApi(projectId)
      if (rs.error) {
        toast.error(rs.error)
      } else {
        setProject(rs.data!.project)
      }
      setLoading(false)
    } catch (error) {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <FullScreen>
        <MoonLoader color='#000' loading speedMultiplier={0.6} size={40} />
      </FullScreen>
    )
  }

  const RenderTab: FunctionComponent = () => {
    if (tab === SettingTab.API_KEY) {
      return <ApiKey />
    }

    return (
      <NewCommunityStore.Provider>
        <General />
      </NewCommunityStore.Provider>
    )
  }

  return (
    <PanelLayout projectId={projectId} active={SideEnum.SETTINGS}>
      <Head>{'Review Submission'}</Head>
      <Tab>
        <TabItem
          active={tab === SettingTab.GENERAL}
          onClick={() =>
            tab !== SettingTab.GENERAL && setTab(SettingTab.GENERAL)
          }
        >
          {'GENERAL'}
        </TabItem>
        <TabItem
          active={tab === SettingTab.API_KEY}
          onClick={() =>
            tab !== SettingTab.API_KEY && setTab(SettingTab.API_KEY)
          }
        >
          {'API KEY'}
        </TabItem>
      </Tab>
      <RenderTab />
    </PanelLayout>
  )
}

export default SettingCommunity
