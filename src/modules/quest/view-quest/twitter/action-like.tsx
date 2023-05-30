import { SizeEnum } from '@/constants/common.const'
import { ActionTwitterFrame } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/utils/type'
import { NegativeButton } from '@/widgets/buttons/button'
import { HorizontalStartCenter } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useStoreState } from 'easy-peasy'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const TwitterLike: FunctionComponent<{ action: QuestTwitterActionType }> = ({ action }) => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <Link to={action.link} target='_blank'>
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
