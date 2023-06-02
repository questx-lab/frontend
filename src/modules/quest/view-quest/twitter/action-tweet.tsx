import { Dispatch, FunctionComponent, SetStateAction } from 'react'

import { useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'

import InputReplyPost from '@/modules/quest/view-quest/twitter/input-reply-post'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/utils/type'
import { PositiveButton } from '@/widgets/buttons/button'
import { HorizontalStartCenter, VerticalFullWidth } from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'

const TwitterTweet: FunctionComponent<{
  action: QuestTwitterActionType
  inputReply: boolean
  setInputReply: Dispatch<SetStateAction<boolean>>
}> = ({ action, inputReply, setInputReply }) => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <div onClick={() => setInputReply(true)}>
      <VerticalFullWidth>
        <Link className='w-full' to={action.link} target='_blank'>
          <VerticalFullWidth>
            <HorizontalStartCenter>
              <NormalText>{'Be sure to include the following words :'}</NormalText>
            </HorizontalStartCenter>
            <PositiveButton block={!user.services?.twitter} isFull>
              {'Tweet about us'}
            </PositiveButton>
          </VerticalFullWidth>
        </Link>
        <InputReplyPost inputReply={inputReply} />
      </VerticalFullWidth>
    </div>
  )
}

export default TwitterTweet
