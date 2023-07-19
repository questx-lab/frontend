import { FC, useState } from 'react'

import tw from 'twin.macro'

import Member from '@/modules/community/settings/chat/content/member'
import ChatSidebar, { ChatSidebarTab } from '@/modules/community/settings/chat/sidebar'
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
  pl-[168px]
  h-full
`

const Content: FC<{ tabSide: ChatSidebarTab }> = ({ tabSide }) => {
  return <Member />
}

const ChatSetting: FC = () => {
  const [tabSide, setTabSide] = useState<ChatSidebarTab>(ChatSidebarTab.MEMBERS)

  const onTabSide = (tab: ChatSidebarTab) => {
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
