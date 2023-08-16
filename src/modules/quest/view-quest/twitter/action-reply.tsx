import { Dispatch, FC, SetStateAction } from 'react'

import { useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'

import { SizeEnum } from '@/constants/common.const'
import InputReplyPost from '@/modules/quest/view-quest/twitter/input-reply-post'
import { ActionTwitterFrame } from '@/modules/quest/view-quest/twitter/mini-widgets'
import ActiveQuestStore from '@/store/local/active-quest'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/types'
import { NegativeButton } from '@/widgets/buttons'
import { HorizontalStartCenter, VerticalFullWidth } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

const TwitterReply: FC<{
  action: QuestTwitterActionType
  inputReply: boolean
  setInputReply: Dispatch<SetStateAction<boolean>>
}> = ({ action, inputReply, setInputReply }) => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)
  const setLikeRetweetReplyClicked = ActiveQuestStore.useStoreActions(
    (action) => action.setLikeRetweetReplyClicked
  )

  return (
    <div
      onClick={() => {
        setLikeRetweetReplyClicked(true)
        setInputReply(true)
        // Temporarily do not require user to submit input reply
      }}
    >
      <VerticalFullWidth>
        <Link to={action.link} target='_blank' className='w-full'>
          <ActionTwitterFrame>
            <HorizontalStartCenter>
              <ChatBubbleLeftRightIcon className='h-7 w-7 text-info' />
              <NormalText>{'Reply to this post'}</NormalText>
            </HorizontalStartCenter>

            <NegativeButton block={!user.services?.twitter} width={SizeEnum.x32}>
              {action.action}
            </NegativeButton>
          </ActionTwitterFrame>
        </Link>
        <InputReplyPost inputReply={inputReply} />
      </VerticalFullWidth>
    </div>
  )
}

export default TwitterReply
