import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'

import { SizeEnum } from '@/constants/common.const'
import { ActionTwitterFrame } from '@/modules/quest/view-quest/twitter/mini-widgets'
import ActiveQuestStore from '@/store/local/active-quest'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/types'
import { NegativeButton } from '@/widgets/buttons'
import { HorizontalStartCenter, VerticalFullWidth } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline'

const TwitterRetweet: FC<{ action: QuestTwitterActionType }> = ({ action }) => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const setLikeRetweetReplyClicked = ActiveQuestStore.useStoreActions(
    (action) => action.setLikeRetweetReplyClicked
  )

  return (
    <div
      onClick={() => {
        setLikeRetweetReplyClicked(true)
      }}
    >
      <VerticalFullWidth>
        <Link to={action.link} target='_blank' className='w-full'>
          <ActionTwitterFrame>
            <HorizontalStartCenter>
              <ArrowPathRoundedSquareIcon className='h-7 w-7 text-info' />
              <NormalText>{'Retweet this post'}</NormalText>
            </HorizontalStartCenter>
            <NegativeButton block={!user.services?.twitter} width={SizeEnum.x32}>
              {action.action}
            </NegativeButton>
          </ActionTwitterFrame>
        </Link>
      </VerticalFullWidth>
    </div>
  )
}

export default TwitterRetweet
