import { FC } from 'react'

import { useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'

import { SizeEnum } from '@/constants/common.const'
import { ActionTwitterFrame } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/types'
import { NegativeButton } from '@/widgets/buttons'
import { HorizontalStartCenter } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { HeartIcon } from '@heroicons/react/24/outline'

const generateLikeLink = (tweetId: string) => {
  return `https://twitter.com/intent/like?tweet_id=${tweetId}`
}

const TwitterLike: FC<{ action: QuestTwitterActionType }> = ({ action }) => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <Link to={generateLikeLink(action.link.split('/').at(-1) || '')} target='_blank'>
      <ActionTwitterFrame>
        <HorizontalStartCenter>
          <HeartIcon className='h-7 w-7 text-info' />
          <NormalText>{'Like this post'}</NormalText>
        </HorizontalStartCenter>
        <NegativeButton block={!user.services?.twitter} width={SizeEnum.x32}>
          {action.action}
        </NegativeButton>
      </ActionTwitterFrame>
    </Link>
  )
}

export default TwitterLike
