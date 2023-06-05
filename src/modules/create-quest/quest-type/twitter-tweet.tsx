import { FunctionComponent } from 'react'

import { TwitterEnum } from '@/constants/common.const'
import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import NewQuestStore from '@/store/local/new-quest.store'
import { Divider } from '@/styles/common.style'
import { MultipleInputBox } from '@/styles/input.style'
import { Label } from '@/widgets/text'

const TwitterTweet: FunctionComponent = () => {
  const actionTwitter = NewQuestStore.useStoreState((state) => state.actionTwitter)
  const setContentTwitter = NewQuestStore.useStoreActions((actions) => actions.setContentTwitter)
  const setIncluded_words = NewQuestStore.useStoreActions((actions) => actions.setIncluded_words)

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
          onChange={(e) => setIncluded_words(e.target.value.split(','))}
          rows={3}
          placeholder='Use , to seperate words that you want to include your tweet, for example: hello,xquest'
        />
      </Padding>
    </>
  )
}

export default TwitterTweet
