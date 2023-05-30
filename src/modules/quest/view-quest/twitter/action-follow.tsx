import { ActionTwitterFrame } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/utils/type'
import { PositiveButton } from '@/widgets/buttons/button'
import { HorizontalStartCenter } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { LinkIcon } from '@heroicons/react/24/outline'
import { useStoreState } from 'easy-peasy'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const TwitterFollow: FunctionComponent<{ action: QuestTwitterActionType }> = ({ action }) => {
  // data
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <Link to={action.link} target='_blank'>
      <ActionTwitterFrame>
        <HorizontalStartCenter>
          <LinkIcon className='h-5 w-5' />
          <NormalText>{action.link}</NormalText>
        </HorizontalStartCenter>
        <PositiveButton block={!user.services?.twitter}>{action.action}</PositiveButton>
      </ActionTwitterFrame>
    </Link>
  )
}

export default TwitterFollow
