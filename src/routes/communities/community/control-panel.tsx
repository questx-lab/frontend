import { CommunityStore } from '@/store/local/community'
import { Divider, Gap } from '@/styles/common.style'
import { ControlPanelTab } from '@/types/community'
import { CommunityType } from '@/utils/type'
import { CircularImage } from '@/widgets/circular-image'
import { HorizontalCenter, Vertical } from '@/widgets/orientation'
import { ArrowUpOnSquareIcon, BoltIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

export const CSide = tw.div`
  w-80
  fixed
  border-r-2
  border-gray-200
  h-full
`

export const PersonWrap = tw(Vertical)`
  justify-center
  items-center
  p-6
`

const TextName = tw.p`
  text-lg
  font-medium
  text-black
  text-center
  max-w-lg
  text-ellipsis
  overflow-hidden
  max-w-[150px]
`

const Padding = tw.div`
  px-4
`

const Tab = styled.div<{ active?: boolean }>(({ active = false }) => {
  if (active) {
    return tw`
      bg-gray-200
      px-3
      py-2
      flex
      flex-row
      justify-start
      items-center
      rounded-lg
      hover:bg-gray-200
      cursor-pointer
      my-2
      text-sm
      font-medium
      text-primary-500
    `
  }

  return tw`
        px-3
        py-2
        bg-white
        flex
        flex-row
        justify-start
        items-center
        rounded-lg
        hover:bg-gray-200
        cursor-pointer
        my-2
        text-sm
        font-medium
        text-gray-700
      `
})

export const ControlPanel: FunctionComponent<{
  community: CommunityType
  show: boolean
}> = ({ community, show }) => {
  // hook
  const navigate = useNavigate()

  // data
  const activeControlPanelTab = CommunityStore.useStoreState((state) => state.activeControlPanelTab)

  if (!show) {
    return <></>
  }

  return (
    <CSide>
      <PersonWrap>
        <CircularImage width={80} height={80} src={'/images/dummy/1.svg'} alt={'Avatar'} />
        <Gap height={6} />

        <HorizontalCenter>
          <TextName>{community.name}</TextName>
          <Gap width={1} />
        </HorizontalCenter>
      </PersonWrap>
      <Divider />
      <Padding>
        <Tab
          onClick={() => {
            if (activeControlPanelTab === ControlPanelTab.QUESTS) {
              return
            }

            navigate('./')
          }}
          active={activeControlPanelTab === ControlPanelTab.QUESTS}
        >
          <BoltIcon className='w-6 h-6 mr-2' />
          {'QUESTS'}
        </Tab>
        <Tab
          onClick={() => {
            if (activeControlPanelTab === ControlPanelTab.REVIEW_SUBMISSION) {
              return
            }
            navigate('./review')
          }}
          active={activeControlPanelTab === ControlPanelTab.REVIEW_SUBMISSION}
        >
          <ArrowUpOnSquareIcon className='w-6 h-6 mr-2' />
          {'REVIEW SUBMISSION'}
        </Tab>
        <Tab
          onClick={() => {
            if (activeControlPanelTab === ControlPanelTab.SETTINGS) {
              return
            }

            navigate('./settings')
          }}
          active={activeControlPanelTab === ControlPanelTab.SETTINGS}
        >
          <Cog6ToothIcon className='w-6 h-6 mr-2' />
          {'SETTINGS'}
        </Tab>
      </Padding>
    </CSide>
  )
}
