import { FC } from 'react'

import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import tw from 'twin.macro'

import { assignCommunityRoleApi, deleteRoleMemberApi } from '@/api/communitiy'
import { getMembers } from '@/modules/community/settings/member/content/member'
import { BorderBox } from '@/modules/community/settings/member/content/mini-widget'
import MemberCommunityStore from '@/store/local/member-community'
import RoleCommunityStore from '@/store/local/role-community'
import { CommunityRoleType, FollowCommunityType } from '@/types/community'
import { Vertical } from '@/widgets/orientation'
import { PopoverClick } from '@/widgets/popover/popover-hover'
import { TextBase } from '@/widgets/text'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Checkbox, ListItem, ListItemPrefix } from '@material-tailwind/react'

const Frame = tw(Vertical)`w-[240px] gap-1 p-4`

const Label = tw.label`flex w-full cursor-pointer items-center px-3 py-2`

export const assignRoleMember = async (
  roleId: string,
  userId: string,
  communityHandle: string,
  onMembers: (member: FollowCommunityType[]) => void
) => {
  try {
    const { error } = await assignCommunityRoleApi(roleId, userId)

    if (error) {
      toast.error(error)
      return
    }

    toast.success('Assigned role successfully')
    if (communityHandle) {
      getMembers(communityHandle, onMembers)
    }
  } catch (error) {}
}

export const deleteRoleMember = async (
  roleIds: string[],
  userId: string,
  communityHandle: string,
  onMembers: (member: FollowCommunityType[]) => void
) => {
  try {
    const { error } = await deleteRoleMemberApi(communityHandle, userId, roleIds)

    if (error) {
      toast.error(error)
      return
    }

    toast.success('Deleted role successfully')
    if (communityHandle) {
      getMembers(communityHandle, onMembers)
    }
  } catch (error) {}
}

const RoleItem: FC<{
  role: CommunityRoleType
  userRoles: CommunityRoleType[]
  userId: string
}> = ({ role, userRoles, userId }) => {
  const { communityHandle } = useParams()
  const setMembers = MemberCommunityStore.useStoreActions((action) => action.setMembers)

  if (!communityHandle) {
    return <></>
  }

  return (
    <ListItem className='p-0'>
      <Label htmlFor={role.id}>
        <ListItemPrefix className='mr-3'>
          <Checkbox
            id={role.id}
            ripple={false}
            checked={userRoles.some((element) => element.id === role.id)}
            onChange={(e) => {
              if (e.target.checked) {
                assignRoleMember(role.id, userId, communityHandle, setMembers)
              } else {
                // TODO: reassign role
                deleteRoleMember([role.id], userId, communityHandle, setMembers)
              }
            }}
            className='hover:before:opacity-0'
            containerProps={{
              className: 'p-0',
            }}
          />
        </ListItemPrefix>
        <TextBase>{role.name}</TextBase>
      </Label>
    </ListItem>
  )
}

const AddRoleMember: FC<{ userRoles: CommunityRoleType[]; userId: string }> = ({
  userRoles,
  userId,
}) => {
  const roles = RoleCommunityStore.useStoreState((state) => state.roles)
  const renderRoles = roles.map((role) => (
    <RoleItem userRoles={userRoles} key={role.id} role={role} userId={userId} />
  ))

  return (
    <PopoverClick
      placement={'bottom'}
      button={
        <BorderBox>
          <PlusIcon className='w-5 h-5 text-gray-900' />
        </BorderBox>
      }
    >
      <Frame>{renderRoles}</Frame>
    </PopoverClick>
  )
}

export default AddRoleMember
