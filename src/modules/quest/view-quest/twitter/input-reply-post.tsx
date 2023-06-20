import { FC } from 'react'

import ActiveQuestStore from '@/store/local/active-quest'
import { TextField } from '@/widgets/form'

const InputReplyPost: FC<{ inputReply: boolean }> = ({ inputReply }) => {
  // data
  const replyUrlSubmit = ActiveQuestStore.useStoreState((state) => state.replyUrlSubmit)

  // action
  const setReplyUrlSubmit = ActiveQuestStore.useStoreActions((action) => action.setReplyUrlSubmit)

  if (inputReply) {
    return (
      <TextField
        required
        value={replyUrlSubmit}
        onChange={(e) => setReplyUrlSubmit(e.target.value)}
        placeholder='https://twitter.com/abc/status/1660098343148699649'
        msg='Input your Link after reply success'
      />
    )
  }
  return <></>
}

export default InputReplyPost
