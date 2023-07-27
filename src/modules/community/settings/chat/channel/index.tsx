import { FC, useEffect } from 'react'

import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { getChannelsApi } from '@/api/chat'
import FormChannel from '@/modules/community/settings/chat/channel/form-channel'
import {
  ButtonAdd,
  Frame,
  FrameContent,
} from '@/modules/community/settings/member/content/mini-widget'
import ChannelSettingStore from '@/store/local/channel-setting'
import { HorizontalBetweenCenterFullWidth, HorizontalFullWidth } from '@/widgets/orientation'
import { TextSm } from '@/widgets/text'

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

const RenderChannels: FC = () => {
  const channels = ChannelSettingStore.useStoreState((state) => state.channels)

  if (!channels) {
    return <></>
  }

  if (channels.length === 0) {
    return <HorizontalFullWidthCenter>{'channels empty'}</HorizontalFullWidthCenter>
  }

  const renderChannels = channels.map((channel, index) => (
    <Padding key={index}>
      <Width290>
        <TextSm>{'#'}</TextSm>
        {channel.name}
      </Width290>
      <Width290>{channel.description}</Width290>
    </Padding>
  ))

  return <FrameContent>{renderChannels}</FrameContent>
}

const ChannelContent: FC = () => {
  const { communityHandle } = useParams()

  const setChannels = ChannelSettingStore.useStoreActions((action) => action.setChannels)
  const setShowModal = ChannelSettingStore.useStoreActions((action) => action.setShowModal)

  useEffect(() => {
    if (communityHandle) {
      getChannels(communityHandle)
    }
  }, [communityHandle])

  const getChannels = async (communityHandle: string) => {
    try {
      const { error, data } = await getChannelsApi(communityHandle)
      if (error) {
        toast.error('get channels data failed')
        return
      }
      if (data) {
        setChannels(data.channels)
      }
    } catch (error) {}
  }

  return (
    <Frame>
      <ButtonAdd
        onOpenModal={() => {
          setShowModal(true)
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
