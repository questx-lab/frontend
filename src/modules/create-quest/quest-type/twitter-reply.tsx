import { FC } from 'react'

import { TwitterEnum } from '@/constants/common.const'
import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import NewQuestStore from '@/store/local/new-quest'
import MultipleInputBox from '@/widgets/input/multiple-input-box'
import { Divider, Gap } from '@/widgets/separator'
import { Label, SmallText } from '@/widgets/text'

const TwitterReply: FC = () => {
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
        <MultipleInputBox
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
