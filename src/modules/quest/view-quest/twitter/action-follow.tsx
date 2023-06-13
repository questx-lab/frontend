import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'

import { ActionTwitterFrame } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/types'
import { PositiveButton } from '@/widgets/buttons'
import { CircularImage } from '@/widgets/circular-image'
import {
  HorizontalBetweenCenterFullWidth,
  HorizontalStartCenter,
  VerticalCenter,
} from '@/widgets/orientation'
import { MediumText, NormalText } from '@/widgets/text'

const GapHorizontalStart = tw(HorizontalStartCenter)`gap-5`
const VerticalStart = tw(VerticalCenter)`items-start`

const TwitterFollow: FC<{ action: QuestTwitterActionType }> = ({ action }) => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <ActionTwitterFrame>
      <HorizontalBetweenCenterFullWidth>
        <GapHorizontalStart>
          <CircularImage
            width={60}
            height={60}
            src={action.twitter_photo_url || ''}
            alt={action.twitter_screen_name}
          />
          <VerticalStart>
            <MediumText>{action.twitter_name}</MediumText>
            <Link to={action.link} target='_blank'>
              <NormalText>@{action.twitter_screen_name}</NormalText>
            </Link>
          </VerticalStart>
        </GapHorizontalStart>
      </HorizontalBetweenCenterFullWidth>
      <Link to={action.link} target='_blank'>
        <PositiveButton block={user && user.services && !user.services?.twitter}>
          {action.action}
        </PositiveButton>
      </Link>
    </ActionTwitterFrame>
  )
}

export default TwitterFollow
