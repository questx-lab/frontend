import { FC } from 'react'

import { TwitterEnum } from '@/constants/common.const'
import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import NewQuestStore from '@/store/local/new-quest'
import { TextField } from '@/widgets/form'
import { Divider } from '@/widgets/separator'
import { Label } from '@/widgets/text'

const TwitterJoinSpace: FC = () => {
  const actionTwitter = NewQuestStore.useStoreState((state) => state.actionTwitter)
  const spaceUrlTw = NewQuestStore.useStoreState((state) => state.spaceUrlTw)
  const setSpaceUrl = NewQuestStore.useStoreActions((actions) => actions.setSpaceUrl)

  if (!actionTwitter.includes(TwitterEnum.JOIN_SPACE)) {
    return <></>
  }

  return (
    <>
      <Divider />
      <Padding>
        <Label>{'SPACE URL'}</Label>
        <TextField
          onChange={(e) => setSpaceUrl(e.target.value)}
          placeholder='Empty'
          value={spaceUrlTw}
          required
          msg='This field is required'
        />
      </Padding>
    </>
  )
}

export default TwitterJoinSpace
