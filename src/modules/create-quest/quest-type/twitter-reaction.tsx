import { FunctionComponent } from 'react'

import { TwitterEnum } from '@/constants/common.const'
import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Divider, Gap } from '@/styles/common.style'
import { TextField } from '@/widgets/form'
import { Label, SmallText } from '@/widgets/text'

const TwitterReaction: FunctionComponent = () => {
  // data
  const actionTwitter = NewQuestStore.useStoreState((state) => state.actionTwitter)
  const tweetUrl = NewQuestStore.useStoreState((state) => state.tweetUrl)

  // action
  const setTweetUrl = NewQuestStore.useStoreActions((actions) => actions.setTweetUrl)

  if (
    !(
      actionTwitter.includes(TwitterEnum.LIKE) ||
      actionTwitter.includes(TwitterEnum.REPLY) ||
      actionTwitter.includes(TwitterEnum.RETWEET)
    )
  ) {
    return <></>
  }

  return (
    <>
      <Divider />
      <Padding>
        <Label>{'TWEET URL'}</Label>
        <TextField
          onChange={(e) => setTweetUrl(e.target.value)}
          placeholder='https://twitter.com/example'
          value={tweetUrl}
          required
          errorMsg='This field is required'
        />
        <Gap height={3} />
        <SmallText>{'Post to like/reply/retweet'}</SmallText>
      </Padding>
    </>
  )
}

export default TwitterReaction
