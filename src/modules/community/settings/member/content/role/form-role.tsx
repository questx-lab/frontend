import { FC, useState } from 'react'

import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import tw from 'twin.macro'

import { createRoleApi, updateRoleApi } from '@/api/communitiy'
import {
  CommunityPermissionFlag,
  CommunityPermissionMapNumber,
  CommunityPermissionMapString,
} from '@/constants/common.const'
import { Element, PaddingVertical } from '@/modules/community/settings/member/content/mini-widget'
import { getRoles } from '@/modules/community/settings/member/content/role'
import RoleCommunityStore, { RoleAction } from '@/store/local/role-community'
import { separateBits } from '@/utils/helper'
import { ButtonTypeEnum, PositiveButton } from '@/widgets/buttons'
import { InputBox } from '@/widgets/form'
import BasicModal from '@/widgets/modal/basic'
import { EndHorizontal } from '@/widgets/orientation'
import { TextBase } from '@/widgets/text'
import { Checkbox, List, ListItem, ListItemPrefix } from '@material-tailwind/react'

const Label = tw.label`flex w-full cursor-pointer items-center px-3 py-2`

const PermissionItem: FC<{
  label: string
  flag: CommunityPermissionFlag
}> = ({ label, flag }) => {
  const permission = RoleCommunityStore.useStoreState((state) => state.permission)
  const setPermission = RoleCommunityStore.useStoreActions((action) => action.setPermission)

  return (
    <ListItem className='p-0'>
      <Label htmlFor={label}>
        <ListItemPrefix className='mr-3'>
          <Checkbox
            id={label}
            ripple={false}
            checked={separateBits(permission).includes(CommunityPermissionMapNumber.get(flag) || 0)}
            onChange={(e) => {
              if (e.target.checked) {
                setPermission(permission + (CommunityPermissionMapNumber.get(flag) || 0))
              } else {
                setPermission(permission - (CommunityPermissionMapNumber.get(flag) || 0))
              }
            }}
            className='hover:before:opacity-0'
            containerProps={{
              className: 'p-0',
            }}
          />
        </ListItemPrefix>
        <TextBase>{label}</TextBase>
      </Label>
    </ListItem>
  )
}

const FormRole: FC = () => {
  // hook
  const [loading, setLoading] = useState<boolean>(false)
  const { communityHandle } = useParams()

  // data
  const showModal = RoleCommunityStore.useStoreState((state) => state.showModal)
  const roleId = RoleCommunityStore.useStoreState((state) => state.roleId)
  const roleName = RoleCommunityStore.useStoreState((state) => state.roleName)
  const roleAction = RoleCommunityStore.useStoreState((state) => state.roleAction)
  const permission = RoleCommunityStore.useStoreState((state) => state.permission)

  // action
  const setRoleName = RoleCommunityStore.useStoreActions((action) => action.setRoleName)
  const setPermission = RoleCommunityStore.useStoreActions((action) => action.setPermission)
  const setRoles = RoleCommunityStore.useStoreActions((action) => action.setRoles)
  const setShowModal = RoleCommunityStore.useStoreActions((action) => action.setShowModal)

  if (!communityHandle) {
    return <></>
  }

  const onModal = (value: boolean) => {
    setPermission(0)
    setShowModal(value)
  }

  const renderPermission = Array.from(CommunityPermissionMapString).map(([flag, label], index) => (
    <PermissionItem key={index} label={label} flag={flag} />
  ))

  const onNewRole = async () => {
    setLoading(true)
    try {
      const { error } = await createRoleApi(communityHandle, roleName, permission)

      if (error) {
        toast.error(error)
        return
      }

      toast.success('create role successfully')
      getRoles(communityHandle, setRoles, setLoading)
      onModal(false)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const onUpdateRole = async () => {
    setLoading(true)
    try {
      const { error } = await updateRoleApi(roleId, roleName, permission)

      if (error) {
        toast.error(error)
        return
      }

      toast.success('Update role successfully')
      getRoles(communityHandle, setRoles, setLoading)
      onModal(false)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const title = roleAction === RoleAction.EDIT ? 'Edit role' : 'Add role'

  const ActionButton: FC = () => {
    if (roleAction === RoleAction.EDIT) {
      return (
        <PositiveButton loading={loading} onClick={onUpdateRole}>
          {'Update'}
        </PositiveButton>
      )
    }

    return (
      <PositiveButton loading={loading} onClick={onNewRole}>
        {'Add'}
      </PositiveButton>
    )
  }

  return (
    <BasicModal title={title} styled='!w-[480px]' isOpen={showModal} onClose={() => onModal(false)}>
      <PaddingVertical>
        <Element label="Role's name">
          <InputBox value={roleName} onChange={(e) => setRoleName(e.target.value)} />
        </Element>
        <Element label='Permission'>
          <List className='grid grid-cols-2'>{renderPermission}</List>
        </Element>
        <EndHorizontal>
          <PositiveButton type={ButtonTypeEnum.NEGATIVE} onClick={() => onModal(false)}>
            {'Cancel'}
          </PositiveButton>
          <ActionButton />
        </EndHorizontal>
      </PaddingVertical>
    </BasicModal>
  )
}

export default FormRole
