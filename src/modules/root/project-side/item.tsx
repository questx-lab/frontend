import { CollaboratorType } from '@/utils/type'
import { FunctionComponent } from 'react'
import { Tooltip } from '@material-tailwind/react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { CircularImage } from '@/widgets/circular-image'
import { RouterConst } from '@/constants/router.const'
import { useNavigate } from 'react-router-dom'
import { IMAGES_SOURCE } from '@/constants/images'

const ActiveAvatar = styled.div<{ active?: boolean }>(({ active = false }) => [
  active
    ? tw`
    rounded-full
    p-1
    border-2
    border-solid
    border-primary
  `
    : tw``,
])

export const Item: FunctionComponent<{
  community: CollaboratorType
  active: boolean
}> = ({ community, active }) => {
  // hook
  const navigate = useNavigate()

  return (
    <>
      <Tooltip key={community.community_id} content={community.community.name} placement='right'>
        <ActiveAvatar active={active}>
          <CircularImage
            onClick={() => navigate(RouterConst.PROJECT + community.community_id)}
            width={45}
            height={45}
            src={community.community.logo_url || IMAGES_SOURCE.community_default}
            alt='logo'
          />
        </ActiveAvatar>
      </Tooltip>
    </>
  )
}
