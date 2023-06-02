import { FunctionComponent } from 'react'

import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import { Gap } from '@/styles/common.style'
import { Image } from '@/widgets/image'
import { HorizontalStartCenter } from '@/widgets/orientation'
import { Large3xlText } from '@/widgets/text'

const TitleBox = tw(HorizontalStartCenter)`
  px-12
  py-6
  w-full
`

const TopLabel: FunctionComponent<{
  isTemplate?: boolean
}> = ({ isTemplate = false }) => {
  const navigate = useNavigate()
  if (isTemplate) {
    return <></>
  }

  return (
    <>
      <TitleBox>
        <Image
          className='cursor-pointer'
          onClick={() => navigate('../')}
          width={35}
          height={35}
          src={StorageConst.ARROW_BACK_ICON.src}
          alt={StorageConst.ARROW_BACK_ICON.alt}
        />
        <Gap width={3} />
        <Large3xlText>{'Create Quest'}</Large3xlText>
      </TitleBox>
    </>
  )
}

export default TopLabel
