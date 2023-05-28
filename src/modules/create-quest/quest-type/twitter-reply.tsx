import { FunctionComponent } from 'react'

import { TwitterEnum } from '@/constants/common.const'
import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Divider, Gap } from '@/styles/common.style'
import { MulInputBox } from '@/styles/input.style'
import { Label, SmallText } from '@/widgets/text'

const TwitterReply: FunctionComponent = () => {
  const actionTwitter = NewQuestStore.useStoreState((state) => state.actionTwitter)
  const setReplyTwitter = NewQuestStore.useStoreActions((actions) => actions.setReplyTwitter)

  if (!actionTwitter.includes(TwitterEnum.REPLY)) {
    return <></>
  }

  return (
    <>
      <Divider />
      <Padding>
        <Label>{'DEFAULT REPLY'}</Label>
        <MulInputBox
          onChange={(e) => setReplyTwitter(e.target.value)}
          rows={3}
          placeholder='Check this out @mantanetworl, @dzucle, @yugih, so cool!'
        />
        <Gap height={3} />
        <SmallText>{'We will prepare a pre-filled reply for the users'}</SmallText>
      </Padding>
    </>
  )
}

export default TwitterReply