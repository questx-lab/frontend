import { FunctionComponent } from 'react'

import { SubtypeBox } from '@/modules/create-quest/quest-type/mini-widget'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { TextField } from '@/widgets/form'

const JoinTelegarm: FunctionComponent = () => {
  // data
  const telegramLink = NewQuestStore.useStoreState((state) => state.telegramLink)

  // action
  const setTelegramLink = NewQuestStore.useStoreActions((actions) => actions.setTelegramLink)

  return (
    <SubtypeBox
      title={'JOIN TELEGRAM'}
      description='Invite link should be in the format https://t.me/groupid'
    >
      <TextField
        onChange={(e) => setTelegramLink(e.target.value)}
        placeholder='Telegram invite link'
        value={telegramLink}
        required
        msg='You must have a url to telegramLink submission.'
      />
    </SubtypeBox>
  )
}

export default JoinTelegarm
