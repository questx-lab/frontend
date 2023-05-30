import { RouterConst } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { CollaboratorType } from '@/utils/type'
import { CircularImage } from '@/widgets/circular-image'
import { Tooltip } from '@material-tailwind/react'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

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
  collaboration: CollaboratorType
  active: boolean
}> = ({ collaboration, active }) => {
  // hook
  const navigate = useNavigate()

  console.log('collaboration.community.logo_url = ', collaboration.community.logo_url)

  return (
    <>
      <Tooltip
        key={collaboration.community.handle}
        content={collaboration.community.name}
        placement='right'
      >
        <ActiveAvatar active={active}>
          <CircularImage
            onClick={() => navigate(RouterConst.PROJECT + collaboration.community.handle)}
            width={45}
            height={45}
            src={StorageConst.COMMUNITY_DEFAULT.src}
            alt='community'
          />
        </ActiveAvatar>
      </Tooltip>
    </>
  )
}
