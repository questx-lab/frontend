import { FunctionComponent } from 'react'

import { TwitterEnum } from '@/constants/common.const'
import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Divider } from '@/styles/common.style'
import { MulInputBox } from '@/styles/input.style'
import { Label } from '@/widgets/text'

const TwitterTweet: FunctionComponent = () => {
  const actionTwitter = NewQuestStore.useStoreState((state) => state.actionTwitter)
  const setContentTwitter = NewQuestStore.useStoreActions((actions) => actions.setContentTwitter)

  if (!actionTwitter.includes(TwitterEnum.TWEET)) {
    return <></>
  }

  return (
    <>
      <Divider />
      <Padding>
        <Label>{'TWEET CONTENT'}</Label>
        <MulInputBox
          onChange={(e) => setContentTwitter(e.target.value)}
          rows={3}
          placeholder='Check this out @mantanetworl, @yugih, so cool!'
        />
      </Padding>
    </>
  )
}

export default TwitterTweet
