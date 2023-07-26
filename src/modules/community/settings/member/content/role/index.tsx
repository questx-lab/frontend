import { FC, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { deleteRoleApi, getRolesApi } from '@/api/communitiy'
import {
  ButtonAdd,
  Frame,
  FrameContent,
} from '@/modules/community/settings/member/content/mini-widget'
import FormRole from '@/modules/community/settings/member/content/role/form-role'
import RoleCommunityStore, { RoleAction } from '@/store/local/role-community'
import { CommunityRoleType } from '@/types/community'
import { HorizontalFullWidth } from '@/widgets/orientation'
import { PopPover } from '@/widgets/popover'
import { Spinner } from '@/widgets/spinner'
import { TextSm } from '@/widgets/text'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

const Padding = tw(HorizontalFullWidth)`
  py-3
  px-6
  gap-3
`

const WidthFull = tw(HorizontalFullWidth)`
  w-full
  items-center
  h-full
`

const PaddingIcon = tw.div`p-3 cursor-pointer`

const DangerTextSm = tw(TextSm)`text-danger`

const RoleItem: FC<{ role: CommunityRoleType }> = ({ role }) => {
  const roles = RoleCommunityStore.useStoreState((state) => state.roles)

  const setRoles = RoleCommunityStore.useStoreActions((action) => action.setRoles)
  const setRoleName = RoleCommunityStore.useStoreActions((action) => action.setRoleName)
  const setPermission = RoleCommunityStore.useStoreActions((action) => action.setPermission)
  const setShowModal = RoleCommunityStore.useStoreActions((action) => action.setShowModal)
  const setRoleAction = RoleCommunityStore.useStoreActions((action) => action.setRoleAction)
  const setRoleId = RoleCommunityStore.useStoreActions((action) => action.setRoleId)

  const onDelete = async () => {
    try {
      const { error } = await deleteRoleApi(role.id)
      if (error) {
        toast.error(error)
        return
      }
      toast.success('Delete role successfully')
      setRoles(roles.filter((e) => role.id !== e.id))
    } catch (error) {}
  }

  const onEdit = () => {
    setRoleId(role.id)
    setRoleName(role.name)
    setPermission(role.permission)
    setShowModal(true)
    setRoleAction(RoleAction.EDIT)
  }

  return (
    <Padding>
      <WidthFull>{role.name}</WidthFull>
      <PopPover
        styled='right-10 top-0 w-[150px]'
        button={
          <PaddingIcon>
            <EllipsisHorizontalIcon className='w-5 h-5 text-gray-900' />
          </PaddingIcon>
        }
      >
        <PaddingIcon>
          <TextSm onClick={onEdit}>{'Edit'}</TextSm>
        </PaddingIcon>
        <PaddingIcon>
          <DangerTextSm onClick={onDelete}>{'Delete'}</DangerTextSm>
        </PaddingIcon>
      </PopPover>
    </Padding>
  )
}

const RenderRoles: FC<{ roles: CommunityRoleType[]; loading: boolean }> = ({ roles, loading }) => {
  if (loading) {
    return <Spinner />
  }

  if (!roles) {
    return <></>
  }

  if (roles.length === 0) {
    return <HorizontalFullWidthCenter>{'Roles empty'}</HorizontalFullWidthCenter>
  }

  const renderRoles = roles.map((role) => <RoleItem key={role.id} role={role} />)

  return <FrameContent>{renderRoles}</FrameContent>
}

export const getRoles = async (
  communityHandle: string,
  onRoles: (roles: CommunityRoleType[]) => void,
  onLoading?: (value: boolean) => void
) => {
  try {
    const { data, error } = await getRolesApi(communityHandle)

    if (error) {
      toast.error(error)
      return
    }

    if (data) {
      onRoles(data.roles)
    }
  } catch (error) {
  } finally {
    if (onLoading) {
      onLoading(false)
    }
  }
}

const RoleContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { communityHandle } = useParams()

  const roles = RoleCommunityStore.useStoreState((state) => state.roles)

  const setRoles = RoleCommunityStore.useStoreActions((action) => action.setRoles)
  const setShowModal = RoleCommunityStore.useStoreActions((action) => action.setShowModal)
  const setRoleName = RoleCommunityStore.useStoreActions((action) => action.setRoleName)
  const setPermission = RoleCommunityStore.useStoreActions((action) => action.setPermission)
  const setRoleAction = RoleCommunityStore.useStoreActions((action) => action.setRoleAction)

  const onAdded = () => {
    setShowModal(true)
    setRoleAction(RoleAction.ADD)
    setRoleName('')
    setPermission(0)
  }

  useEffect(() => {
    if (communityHandle) {
      getRoles(communityHandle, setRoles, setLoading)
    }
  }, [communityHandle])

  if (!communityHandle) {
    return <></>
  }

  return (
    <Frame>
      <ButtonAdd onOpenModal={onAdded} buttonName='Add Role' />
      <RenderRoles loading={loading} roles={roles} />
      <FormRole />
    </Frame>
  )
}

const Role: FC = () => {
  return (
    <RoleCommunityStore.Provider>
      <RoleContent />
    </RoleCommunityStore.Provider>
  )
}

export default Role
