import { FC, useState } from 'react'

import tw from 'twin.macro'

import { ChatSettingSidebar } from '@/constants/common.const'
import Channel from '@/modules/community/settings/chat/channel'
import ChatSidebar from '@/modules/community/settings/chat/sidebar'
import { HorizontalFullWidth } from '@/widgets/orientation'

const Frame = tw(HorizontalFullWidth)`
  w-full
  h-full
  py-4
  px-36
  overflow-y-hidden
`

const ContentFrame = tw.div`
  w-full
  pl-[180px]
  h-full
`

const Content: FC<{ tabSide: ChatSettingSidebar }> = ({ tabSide }) => {
  return <Channel />
}

const ChatSetting: FC = () => {
  const [tabSide, setTabSide] = useState<ChatSettingSidebar>(ChatSettingSidebar.CHANNEL)

  const onTabSide = (tab: ChatSettingSidebar) => {
    setTabSide(tab)
  }

  return (
    <Frame>
      <ChatSidebar tabSide={tabSide} onTabSide={onTabSide} />
      <ContentFrame>
        <Content tabSide={tabSide} />
      </ContentFrame>
    </Frame>
  )
}

export default ChatSetting
