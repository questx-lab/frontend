import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import { SubtypeBox } from '@/modules/create-quest/quest-type/mini-widget'
import NewQuestStore from '@/store/local/new-quest'

const InputInviteBox = tw.input`
  w-full
  border
  border-[1px]
  border-solid
  border-gray-300
  p-3
  rounded-lg
`

const Invite: FunctionComponent = () => {
  // data
  const invites = NewQuestStore.useStoreState((state) => state.invites)

  // action
  const setInvites = NewQuestStore.useStoreActions((actions) => actions.setInvites)

  return (
    <SubtypeBox
      title='INVITES'
      description='Invited user needs to complete 1 quest for invite to count'
    >
      <InputInviteBox
        onChange={(e: any) => setInvites(parseInt(e.target.value ?? '0'))}
        defaultValue={invites}
        type='number'
      />
    </SubtypeBox>
  )
}

export default Invite
