import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import QuestsTab from '@/modules/community/control-panel/quests'
import ReviewSubmissionsTab from '@/modules/community/control-panel/review-submissions'
import SettingsTab from '@/modules/community/control-panel/settings'
import { CommunityType } from '@/types/community'
import { CircularImage } from '@/widgets/circular-image'
import { HorizontalCenter, VerticalCenter } from '@/widgets/orientation'
import { Divider, Gap } from '@/widgets/separator'

export const FixedFrame = tw.div`
  w-80
  fixed
  border-r-2
  border-gray-200
  h-full
`

export const PersonWrap = tw(VerticalCenter)`
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

export const ControlPanel: FunctionComponent<{
  community: CommunityType
  show: boolean
}> = ({ community, show }) => {
  if (!show) {
    return <></>
  }

  return (
    <FixedFrame>
      <PersonWrap>
        <CircularImage
          width={80}
          height={80}
          src={community.logo_url || StorageConst.COMMUNITY_DEFAULT.src}
          alt={StorageConst.COMMUNITY_DEFAULT.alt}
        />
        <Gap height={6} />

        <HorizontalCenter>
          <TextName>{community.display_name}</TextName>
          <Gap width={1} />
        </HorizontalCenter>
      </PersonWrap>
      <Divider />
      <Padding>
        <QuestsTab />
        <ReviewSubmissionsTab />
        <SettingsTab />
      </Padding>
    </FixedFrame>
  )
}
