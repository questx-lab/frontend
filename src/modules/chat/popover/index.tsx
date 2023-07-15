import { FC, useState } from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import Channel from '@/modules/chat/popover/channel'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalFullWidth,
  VerticalFullWidth,
} from '@/widgets/orientation'
import { PopoverButton, PopoverPosition } from '@/widgets/popover'
import { TextSm, TextXl } from '@/widgets/text'
import { Popover, Transition } from '@headlessui/react'
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'

enum TabChatType {
  GENERAL = '#General',
  CHANNELS = '#Channels',
}

const PopPanel = tw(Popover.Panel)`
  divide-y
  right-0
  rounded-lg
  mt-3
  absolute z-10
  bg-white
  shadow-lg
  border
  border-solid
  border-gray-300
  w-[480px]
  flex
  flex-col
`

const Frame = tw(VerticalFullWidth)`
  h-[800px]
  gap-6
  py-6
`

const Padding = tw(VerticalFullWidth)`
  px-6
  gap-6
`

const TabFrame = tw(HorizontalFullWidth)`gap-2`

const Content = tw.div`
  h-full
  w-full
  overflow-y-scroll
  px-6
`

const FootFrame = tw(HorizontalFullWidthCenter)`
  border-t
  border-solid
  border-gray-200
  pt-6
  px-6
  justify-center
`

const PrimaryText = tw(TextSm)`text-primary font-medium`

const Tab = styled.div<{ isActive: boolean }>(({ isActive }) => {
  const styles = [tw`py-[10px] px-3 text-sm rounded-full`]

  if (isActive) {
    styles.push(tw`bg-primary text-white font-medium`)
  } else {
    styles.push(tw`bg-gray-200 text-gray-900 font-normal`)
  }

  return styles
})

const ChatTab: FC<{ tab: TabChatType; onTabChange: (value: TabChatType) => void }> = ({
  tab,
  onTabChange,
}) => {
  const onClicked = (activeTab: TabChatType) => {
    if (tab !== activeTab) {
      onTabChange(activeTab)
    }
  }

  return (
    <TabFrame>
      <Tab isActive={tab === TabChatType.GENERAL} onClick={() => onClicked(TabChatType.GENERAL)}>
        {TabChatType.GENERAL}
      </Tab>
      <Tab isActive={tab === TabChatType.CHANNELS} onClick={() => onClicked(TabChatType.CHANNELS)}>
        {TabChatType.CHANNELS}
      </Tab>
    </TabFrame>
  )
}

const ContentTab: FC<{ tab: TabChatType }> = ({ tab }) => {
  if (tab === TabChatType.CHANNELS) {
    return <Channel />
  }

  return <></>
}

const ChatPopover: FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [tab, setTab] = useState<TabChatType>(TabChatType.GENERAL)

  const onTabChange = (tab: TabChatType) => {
    setTab(tab)
  }

  return (
    <PopoverPosition>
      <PopoverButton onClick={() => setVisible(!visible)}>
        <ChatBubbleLeftIcon className='w-5 h-5 text-gray-900' />
      </PopoverButton>
      <Transition
        show={visible}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <PopPanel>
          <Frame>
            <Padding>
              <HorizontalBetweenCenterFullWidth>
                <TextXl>{'Chat'}</TextXl>
                <XMarkIcon className='w-6 h-6 text-gray-900' onClick={() => setVisible(false)} />
              </HorizontalBetweenCenterFullWidth>
              <ChatTab tab={tab} onTabChange={onTabChange} />
            </Padding>

            <Content>
              <ContentTab tab={tab} />
            </Content>
            <FootFrame>
              <PrimaryText>{'See all in chat room'}</PrimaryText>
            </FootFrame>
          </Frame>
        </PopPanel>
      </Transition>
    </PopoverPosition>
  )
}

export default ChatPopover
