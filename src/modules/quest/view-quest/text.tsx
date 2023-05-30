import { CommunityRoleEnum } from '@/constants/common.const'
import { ActiveQuestStore } from '@/store/local/active-quest'
import { CommunityStore } from '@/store/local/community'
import { TextField } from '@/widgets/form'
import { FunctionComponent } from 'react'

export const QuestText: FunctionComponent = () => {
  // data
  const role = CommunityStore.useStoreState((state) => state.role)
  const textSubmit = ActiveQuestStore.useStoreState((state) => state.textSubmit)

  // action
  const setTextSubmit = ActiveQuestStore.useStoreActions((action) => action.setTextSubmit)

  console.log('role = ', role)

  if (role !== CommunityRoleEnum.GUEST) {
    return <></>
  }

  return (
    <TextField
      msg='This field is required'
      placeholder='Input your text'
      required
      onChange={(e) => setTextSubmit(e.target.value)}
      value={textSubmit}
    />
  )
}
