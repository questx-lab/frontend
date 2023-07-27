import { FC, useState } from 'react'

import { useParams } from 'react-router-dom'

import { assignRoleMember } from '@/modules/community/settings/member/content/member/add-role-member'
import FilterUser from '@/modules/community/settings/member/content/member/filter-user'
import { Element, PaddingVertical } from '@/modules/community/settings/member/content/mini-widget'
import MemberCommunityStore from '@/store/local/member-community'
import RoleCommunityStore from '@/store/local/role-community'
import { CommunityRoleType } from '@/types/community'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import BasicModal from '@/widgets/modal/basic'
import { EndHorizontal, HorizontalFullWidth } from '@/widgets/orientation'
import { Option, Select } from '@material-tailwind/react'

const FormMember: FC = () => {
  const { communityHandle } = useParams()
  const [role, setRole] = useState<CommunityRoleType>()
  const selectedMember = MemberCommunityStore.useStoreState((state) => state.selectedMember)

  const showModal = MemberCommunityStore.useStoreState((state) => state.showModal)
  const roles = RoleCommunityStore.useStoreState((state) => state.roles)

  const setShowModal = MemberCommunityStore.useStoreActions((action) => action.setShowModal)
  const setMembers = MemberCommunityStore.useStoreActions((action) => action.setMembers)

  if (!communityHandle) {
    return <></>
  }

  if (!roles) {
    return <></>
  }

  const renderRoles = roles.map((role) => (
    <Option onClick={() => setRole(role)} key={role.id}>
      {role.name}
    </Option>
  ))

  return (
    <BasicModal
      title={'Add new member'}
      styled='!w-[480px]'
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <PaddingVertical>
        <Element label="Role's name">
          <FilterUser />
        </Element>
        <Element label='Role'>
          <HorizontalFullWidth>
            <Select size='lg' label='Select Role'>
              {renderRoles}
            </Select>
          </HorizontalFullWidth>
        </Element>
        <EndHorizontal>
          <PositiveButton type={ButtonTypeEnum.NEGATIVE} onClick={() => setShowModal(false)}>
            {'Cancel'}
          </PositiveButton>
          <PositiveButton
            block={!role || !selectedMember}
            onClick={() => {
              setShowModal(false)
              if (role && selectedMember) {
                assignRoleMember(role.id, selectedMember.user.id, communityHandle, setMembers)
              }
            }}
          >
            {'Add'}
          </PositiveButton>
        </EndHorizontal>
      </PaddingVertical>
    </BasicModal>
  )
}

export default FormMember
