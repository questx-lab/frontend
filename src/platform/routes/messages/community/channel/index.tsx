import { FC, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import tw from 'twin.macro'

import ChatBox from '@/modules/chat/chat-box'
import chatController from '@/modules/chat/services/chat-controller'
import ChatStore from '@/store/chat/chat'
import CommunityStore from '@/store/local/community'
import { VerticalCenter } from '@/widgets/orientation'

const ChatFrame = tw(VerticalCenter)`
  w-full
  h-[calc(100vh_-_64px)]
`

const FixedWidth = tw.div`
  w-full
  h-full
  pl-[360px]
`

const Index: FC = () => {
  const { channelId } = useParams()
  const community = CommunityStore.useStoreState((state) => state.selectedCommunity)
  const channel = chatController.getChannel(community.handle, BigInt(channelId || '0'))

  // actions
  const setChannel = ChatStore.useStoreActions((actions) => actions.setChannel)

  useEffect(() => {
    if (channel) {
      // Setting channel...
      setChannel(channel)
    }
  }, [channel])

  // Set current channel

  if (channel === undefined) {
    return <></>
  }

  return (
    <ChatFrame>
      <FixedWidth>
        <ChatBox />
      </FixedWidth>
    </ChatFrame>
  )
}

export default Index
