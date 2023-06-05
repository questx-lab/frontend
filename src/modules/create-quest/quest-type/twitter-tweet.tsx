import { FunctionComponent } from 'react'

import { TwitterEnum } from '@/constants/common.const'
import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import NewQuestStore from '@/store/local/new-quest.store'
import { Divider } from '@/styles/common.style'
import MultipleInputBox from '@/widgets/input/multiple-input-box'
import { Label } from '@/widgets/text'

const TwitterTweet: FunctionComponent = () => {
  const actionTwitter = NewQuestStore.useStoreState((state) => state.actionTwitter)
  const setContentTwitter = NewQuestStore.useStoreActions((actions) => actions.setContentTwitter)
  const setIncludedWords = NewQuestStore.useStoreActions((actions) => actions.setIncludedWords)

  if (!actionTwitter.includes(TwitterEnum.TWEET)) {
    return <></>
  }

  return (
    <>
      <Divider />
      <Padding>
        <Label>{'TWEET CONTENT'}</Label>
        <MultipleInputBox
          onChange={(e) => setContentTwitter(e.target.value)}
          rows={3}
          placeholder='Check this out @mantanetworl, @yugih, so cool!'
        />
      </Padding>
      <Divider />
      <Padding>
        <Label>{'INCLUDE WORDS'}</Label>
        <MultipleInputBox
          onChange={(e) => setIncludedWords(e.target.value.split(','))}
          rows={3}
          placeholder='Use , to seperate words that you want to include your tweet, for example: hello,xquest'
        />
      </Padding>
    </>
  )
}

export default TwitterTweet
