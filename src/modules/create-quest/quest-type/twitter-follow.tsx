import { FC } from 'react'

import { TwitterEnum } from '@/constants/common.const'
import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import NewQuestStore from '@/store/local/new-quest'
import { TextField } from '@/widgets/form'
import { Divider } from '@/widgets/separator'
import { Label } from '@/widgets/text'

const TwitterFollow: FC = () => {
  // data
  const actionTwitter = NewQuestStore.useStoreState((state) => state.actionTwitter)
  const accountUrl = NewQuestStore.useStoreState((state) => state.accountUrl)

  // action
  const setAccountLink = NewQuestStore.useStoreActions((actions) => actions.setAccountLink)

  if (!actionTwitter.includes(TwitterEnum.FOLLOW)) {
    return <></>
  }

  return (
    <>
      <Divider />
      <Padding>
        <Label>{'ACCOUNT URL'}</Label>
        <TextField
          onChange={(e) => setAccountLink(e.target.value)}
          placeholder='https://twitter.com/elon.musk'
          value={accountUrl}
          required
          msg='This field is required'
        />
      </Padding>
    </>
  )
}

export default TwitterFollow
