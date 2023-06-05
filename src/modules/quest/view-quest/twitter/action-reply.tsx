import { Dispatch, FunctionComponent, SetStateAction } from 'react'

import { useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'

import { SizeEnum } from '@/constants/common.const'
import InputReplyPost from '@/modules/quest/view-quest/twitter/input-reply-post'
import { ActionTwitterFrame } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/utils/type'
import { NegativeButton } from '@/widgets/buttons'
import { HorizontalStartCenter, VerticalFullWidth } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

const TwitterReply: FunctionComponent<{
  action: QuestTwitterActionType
  inputReply: boolean
  setInputReply: Dispatch<SetStateAction<boolean>>
}> = ({ action, inputReply, setInputReply }) => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <div onClick={() => setInputReply(true)}>
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
