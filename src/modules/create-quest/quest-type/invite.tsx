import { Padding } from '@/modules/create-quest/quest-type/mini-widget'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Divider, Gap } from '@/styles/common.style'
import { SmallText } from '@/widgets/text'
import { Label } from '@headlessui/react/dist/components/label/label'
import { FunctionComponent } from 'react'
import tw from 'twin.macro'

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
    <>
      <Divider />
      <Padding>
        <Label>{'INVITES'}</Label>
        <Gap height={2} />
        <InputInviteBox
          onChange={(e: any) => setInvites(parseInt(e.target.value ?? '0'))}
          defaultValue={invites}
          type='number'
        />
        <Gap height={2} />
        <SmallText>{'Invited user needs to complete 1 quest for invite to count'}</SmallText>
      </Padding>
    </>
  )
}

export default Invite
