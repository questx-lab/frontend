import { FC, useEffect } from 'react'

import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { deleteChannelApi, getChannelsApi } from '@/api/chat'
import FormChannel from '@/modules/community/settings/chat/channel/form-channel'
import {
  ButtonAdd,
  Frame,
  FrameContent,
} from '@/modules/community/settings/member/content/mini-widget'
import ChannelSettingStore, { ChannelAction } from '@/store/local/channel-setting'
import { ChannelType } from '@/types/chat'
import { HorizontalBetweenCenterFullWidth, HorizontalFullWidth } from '@/widgets/orientation'
import { PopPover } from '@/widgets/popover'
import { TextSm } from '@/widgets/text'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

const Padding = tw(HorizontalBetweenCenterFullWidth)`
  py-3
  px-6
  gap-3
`

const Width290 = tw(HorizontalFullWidth)`
  w-[290px]
  items-center
  h-full
  text-sm
  gap-1
  flex-wrap
`
const PaddingIcon = tw.div`p-3 cursor-pointer`
const DangerTextSm = tw(TextSm)`text-danger`

export const getChannels = async (
  communityHandle: string,
  onChannels: (value: ChannelType[]) => void
) => {
  try {
    const { error, data } = await getChannelsApi(communityHandle)
    if (error) {
      toast.error('get channels data failed')
      return
    }
    if (data) {
      onChannels(data.channels)
    }
  } catch (error) {}
}

const ChannelItem: FC<{ channel: ChannelType }> = ({ channel }) => {
  const { communityHandle } = useParams()

  const setChannels = ChannelSettingStore.useStoreActions((action) => action.setChannels)
  const setChannelAction = ChannelSettingStore.useStoreActions((action) => action.setChannelAction)
  const setShowModal = ChannelSettingStore.useStoreActions((action) => action.setShowModal)
  const setName = ChannelSettingStore.useStoreActions((action) => action.setName)
  const setDescription = ChannelSettingStore.useStoreActions((action) => action.setDescription)
  const setChannelId = ChannelSettingStore.useStoreActions((action) => action.setChannelId)

  if (!communityHandle) {
    return <></>
  }

  const onEdit = () => {
    setChannelAction(ChannelAction.EDIT)
    setShowModal(true)
    setChannelId(channel.id)
    setName(channel.name)
    setDescription(channel.description || '')
  }

  const onDelete = async () => {
    try {
      const { error } = await deleteChannelApi(channel.id)

      if (error) {
        toast.error(error)
        return
      }

      getChannels(communityHandle, setChannels)

      toast.success('Delete channel successfully')
    } catch (error) {}
  }

  return (
    <Padding>
      <Width290>
        <TextSm>{'#'}</TextSm>
        {channel.name}
      </Width290>
      <Width290>{channel.description}</Width290>
      <PopPover
        styled='right-10 top-0 w-[150px]'
        button={
          <PaddingIcon>
            <EllipsisHorizontalIcon className='w-5 h-5 text-gray-900' />
          </PaddingIcon>
        }
      >
        <PaddingIcon>
          <TextSm onClick={onEdit}>{'Edit'}</TextSm>
        </PaddingIcon>
        <PaddingIcon>
          <DangerTextSm onClick={onDelete}>{'Delete'}</DangerTextSm>
        </PaddingIcon>
      </PopPover>
    </Padding>
  )
}

const RenderChannels: FC = () => {
  const channels = ChannelSettingStore.useStoreState((state) => state.channels)

  if (!channels) {
    return <></>
  }

  if (channels.length === 0) {
    return <HorizontalFullWidthCenter>{'channels empty'}</HorizontalFullWidthCenter>
  }

  const renderChannels = channels.map((channel, index) => (
    <ChannelItem channel={channel} key={index} />
  ))

  return <FrameContent>{renderChannels}</FrameContent>
}

const ChannelContent: FC = () => {
  const { communityHandle } = useParams()

  const setChannels = ChannelSettingStore.useStoreActions((action) => action.setChannels)
  const setShowModal = ChannelSettingStore.useStoreActions((action) => action.setShowModal)
  const setChannelAction = ChannelSettingStore.useStoreActions((action) => action.setChannelAction)
  const setName = ChannelSettingStore.useStoreActions((action) => action.setName)
  const setDescription = ChannelSettingStore.useStoreActions((action) => action.setDescription)

  useEffect(() => {
    if (communityHandle) {
      getChannels(communityHandle, setChannels)
    }
  }, [communityHandle])

  return (
    <Frame>
      <ButtonAdd
        onOpenModal={() => {
          setShowModal(true)
          setChannelAction(ChannelAction.ADD)
          setDescription('')
          setName('')
        }}
        buttonName='Add Channel'
      />
      <RenderChannels />
      <FormChannel />
    </Frame>
  )
}

const Channel: FC = () => {
  return (
    <ChannelSettingStore.Provider>
      <ChannelContent />
    </ChannelSettingStore.Provider>
  )
}

export default Channel
