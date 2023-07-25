import { FC, useState } from 'react'

import InviteCommunity from '@/modules/header/invite-community'
import BasicModal from '@/widgets/modal/basic'
import { OptionxBox } from '@/widgets/popover'

const Referral: FC<{ close: () => void }> = ({ close }) => {
  // hook
  const [isInvite, setInvite] = useState<boolean>(false)

  return (
    <>
      <OptionxBox
        onClick={() => {
          setInvite(true)
          // close()
        }}
      >
        {'Referral Program'}
      </OptionxBox>

      <BasicModal
        title={`Invite Friend to create project 👋`}
        isOpen={isInvite}
        onClose={() => {
          setInvite(false)
          close()
        }}
        styled='!w-[780px]'
      >
        <InviteCommunity />
      </BasicModal>
    </>
  )
}

export default Referral
