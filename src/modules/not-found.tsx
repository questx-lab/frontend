import { FC } from 'react'

import { Link } from 'react-router-dom'
import tw from 'twin.macro'

import { RouterConst } from '@/constants/router.const'
import StorageConst from '@/constants/storage.const'
import { Image } from '@/widgets/image'
import { VerticalCenter } from '@/widgets/orientation'
import { MediumText2Xl, TextSm } from '@/widgets/text'
import { Button } from '@material-tailwind/react'

const Frame = tw(VerticalCenter)`w-screen h-screen gap-5`

const CenterTextSm = tw(TextSm)`text-center`

const NotFound: FC = () => {
  return (
    <Frame>
      <Image width={256} height={256} src={StorageConst.HUSKY.src} alt='' />
      <MediumText2Xl>{'Page not found'}</MediumText2Xl>
      <CenterTextSm>{`
    The page you are looking for might have been removed, had its name changed or is temporarily
    unavailable.
    `}</CenterTextSm>
      <Link to={RouterConst.HOME}>
        <Button>{'GO TO HOMEPAGE'}</Button>
      </Link>
    </Frame>
  )
}

export default NotFound
