import { FC } from 'react'

import { Element, PaddingVertical } from '@/modules/community/settings/member/content/mini-widget'
import MemberCommunityStore from '@/store/local/member-community'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import { InputBox } from '@/widgets/form'
import BasicModal from '@/widgets/modal/basic'
import { EndHorizontal } from '@/widgets/orientation'

const FormMember: FC = () => {
  const showModal = MemberCommunityStore.useStoreState((state) => state.showModal)
  const profile = MemberCommunityStore.useStoreState((state) => state.profile)

  const setShowModal = MemberCommunityStore.useStoreActions((action) => action.setShowModal)
  const setProfile = MemberCommunityStore.useStoreActions((action) => action.setProfile)

  return (
    <BasicModal
      title={'Add new member'}
      styled='!w-[480px]'
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <PaddingVertical>
        <Element label="Role's name">
          <InputBox value={profile} onChange={(e) => setProfile(e.target.value)} />
        </Element>
        <Element label='Permission'>
          <InputBox value={profile} onChange={(e) => setProfile(e.target.value)} />
        </Element>
        <EndHorizontal>
          <PositiveButton type={ButtonTypeEnum.NEGATIVE} onClick={() => setShowModal(false)}>
            {'Cancel'}
          </PositiveButton>
          <PositiveButton type={ButtonTypeEnum.NEGATIVE} onClick={() => setShowModal(false)}>
            {'Add'}
          </PositiveButton>
        </EndHorizontal>
      </PaddingVertical>
    </BasicModal>
  )
}

export default FormMember
