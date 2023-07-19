import { FC, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import tw from 'twin.macro'

import { getChanelsApi } from '@/api/chat'
import { ChannelType } from '@/types/chat'
import { Image } from '@/widgets/image'
import { Horizontal, Vertical } from '@/widgets/orientation'
import { SmallSpinner } from '@/widgets/spinner'
import { LightTextXs, MediumTextSm, TextSm } from '@/widgets/text'

const Frame = tw.div`w-full h-full`

const GapVertical = tw(Vertical)`
  h-full
  w-full
  justify-center
  gap-1
`

const GapHorizontal = tw(Horizontal)`
  gap-3
  w-full
  items-center
  cursor-pointer
`

export const ChannelItem: FC<{ channel: ChannelType }> = ({ channel }) => {
  return (
    <GapHorizontal>
      <Image src={channel.avatar} width={64} height={64} />
      <GapVertical>
        <MediumTextSm>{channel.name}</MediumTextSm>
        <LightTextXs>{channel.description}</LightTextXs>
      </GapVertical>
    </GapHorizontal>
  )
}

const Channel: FC = () => {
  const [channels, setChannels] = useState<ChannelType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getChannel()
  }, [])

  const getChannel = async () => {
    try {
      const { error, data } = await getChanelsApi()
      if (error) {
        toast.error(error)
      }

      if (data) {
        setChannels(data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Frame>
        <SmallSpinner />
      </Frame>
    )
  }

  if (channels.length === 0) {
    return (
      <Frame>
        <TextSm>{'No channels available currently'}</TextSm>
      </Frame>
    )
  }

  const renderChannels = channels.map((channel, index) => (
    <ChannelItem channel={channel} key={index} />
  ))

  return <Frame>{renderChannels}</Frame>
}

export default Channel
