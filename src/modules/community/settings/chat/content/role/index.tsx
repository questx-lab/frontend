import { FC, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import tw from 'twin.macro'

import { HorizontalFullWidthCenter } from '@/admin-portal/modules/referrals/mini-widget'
import { getRolesApi } from '@/api/chat'
import AddRole from '@/modules/community/settings/chat/content/role/add-role'
import { RoleChatType } from '@/types/chat'
import { HorizontalFullWidth, VerticalFullWidth } from '@/widgets/orientation'
import { PopPover } from '@/widgets/popover'
import { Spinner } from '@/widgets/spinner'
import { TextSm } from '@/widgets/text'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

const Frame = tw(VerticalFullWidth)`
  h-full
  overflow-y-scroll
  gap-3
`

const Padding = tw(HorizontalFullWidth)`
  py-3
  px-6
  gap-3
  rounded-lg
  bg-primary-50
`

const WidthFull = tw(HorizontalFullWidth)`
  w-full
  items-center
  h-full
`

const Width100 = tw(HorizontalFullWidth)`
  w-[100px]
  items-center
  h-full
  text-sm

`

const PaddingIcon = tw.div`p-3 cursor-pointer`

const RoleItem: FC<{ role: RoleChatType }> = ({ role }) => {
  return (
    <Padding>
      <WidthFull>{role.name}</WidthFull>
      <Width100>{role.createdAt}</Width100>
      <PopPover
        styled='right-10 top-0 w-[150px]'
        button={
          <PaddingIcon>
            <EllipsisHorizontalIcon className='w-5 h-5 text-gray-900' />
          </PaddingIcon>
        }
      >
        <PaddingIcon>
          <TextSm>{'Edit'}</TextSm>
        </PaddingIcon>
        <PaddingIcon>
          <TextSm>{'Delete'}</TextSm>
        </PaddingIcon>
      </PopPover>
    </Padding>
  )
}

const RenderRoles: FC<{ roles: RoleChatType[]; loading: boolean }> = ({ roles, loading }) => {
  if (loading) {
    return <Spinner />
  }

  if (roles.length === 0) {
    return <HorizontalFullWidthCenter>{'Roles empty'}</HorizontalFullWidthCenter>
  }

  const renderRoles = roles.map((role) => <RoleItem key={role.id} role={role} />)

  return <Frame>{renderRoles}</Frame>
}

const Role: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [roles, setRoles] = useState<RoleChatType[]>([])

  useEffect(() => {
    getRoles()
  }, [])

  const getRoles = async () => {
    try {
      const { data, error } = await getRolesApi()

      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        setRoles(data)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <Frame>
      <AddRole />
      <RenderRoles loading={loading} roles={roles} />
    </Frame>
  )
}

export default Role
