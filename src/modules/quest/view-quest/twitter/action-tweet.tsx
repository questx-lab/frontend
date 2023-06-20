import { Dispatch, FC, SetStateAction } from 'react'

import { useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'

import { ColorEnum, SizeEnum } from '@/constants/common.const'
import InputReplyPost from '@/modules/quest/view-quest/twitter/input-reply-post'
import { ColorBox } from '@/modules/quest/view-quest/twitter/mini-widgets'
import { GlobalStoreModel } from '@/store/store'
import { QuestTwitterActionType } from '@/types'
import { PositiveButton } from '@/widgets/buttons'
import {
  HorizontalStartCenter,
  VerticalFullWidth,
  VerticalFullWidthStartCenter,
} from '@/widgets/orientation'
import { NormalText } from '@/widgets/text'

const GapVertical = tw(VerticalFullWidth)`gap-6`

const PointerWord = tw(HorizontalStartCenter)`cursor-pointer`

const generateTweetLink = (defaultTweet: string): string => {
  const urlEncode = new URLSearchParams(defaultTweet)
  return `https://twitter.com/intent/tweet?text=${urlEncode}`
}

const IncludedWords: FC<{ includedWords: string[] }> = ({ includedWords }) => {
  if (includedWords.length === 0) {
    return <></>
  }

  const renderWords = includedWords.map((word) => (
    <ColorBox onClick={() => {}} boxColor={ColorEnum.SUCCESS} width={SizeEnum.NONE}>
      #{word}
    </ColorBox>
  ))

  return (
    <VerticalFullWidthStartCenter>
      <NormalText>{'Be sure to include the following words :'}</NormalText>
      <PointerWord>{renderWords}</PointerWord>
    </VerticalFullWidthStartCenter>
  )
}

const TwitterTweet: FC<{
  action: QuestTwitterActionType
  inputReply: boolean
  setInputReply: Dispatch<SetStateAction<boolean>>
}> = ({ action, inputReply, setInputReply }) => {
  const user = useStoreState<GlobalStoreModel>((state) => state.user)

  return (
    <GapVertical>
      <GapVertical>
        <Link
          onClick={() => setInputReply(true)}
          className='w-full'
          to={generateTweetLink(action.link)}
          target='_blank'
        >
          <PositiveButton block={!user.services?.twitter} isFull>
            {'Tweet about us'}
          </PositiveButton>
        </Link>
        <IncludedWords includedWords={action.included_words || []} />
      </GapVertical>
      <InputReplyPost inputReply={inputReply} />
    </GapVertical>
  )
}

export default TwitterTweet
