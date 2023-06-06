import { FunctionComponent } from 'react'

import { useNavigate } from 'react-router'
import tw from 'twin.macro'

import { communityRoute } from '@/constants/router.const'
import { StorageConst } from '@/constants/storage.const'
import { Image } from '@/widgets/image'
import { HorizontalStartCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Large3xlText } from '@/widgets/text'

const TitleBox = tw(HorizontalStartCenter)`
  px-12
  py-6
  w-full
`

const TopLabel: FunctionComponent<{
  communityHandle: string
  isEdit: boolean
}> = ({ communityHandle, isEdit }) => {
  const navigate = useNavigate()
  const title = isEdit ? 'Edit Quest' : 'Create Quest'

  return (
    <>
      <TitleBox>
        <Image
          className='cursor-pointer'
          onClick={() => navigate(communityRoute(communityHandle))}
          width={35}
          height={35}
          src={StorageConst.ARROW_BACK_ICON.src}
          alt={StorageConst.ARROW_BACK_ICON.alt}
        />
        <Gap width={3} />
        <Large3xlText>{title}</Large3xlText>
      </TitleBox>
    </>
  )
}

export default TopLabel
