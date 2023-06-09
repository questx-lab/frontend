import { FC } from 'react'

import { AvatarUpload } from '@/modules/create-community/avatar-upload'
import { Gap } from '@/widgets/separator'
import { HeaderText3, PrimaryText } from '@/widgets/text'

const Logo: FC = () => {
  return (
    <>
      <HeaderText3>{'PROJECT IMAGE'}</HeaderText3>
      <AvatarUpload imageSize={250} />
      <Gap height={2} />
      <PrimaryText size='sm'>{'*Max 5.0MB, Size 200x200px'}</PrimaryText>
      <Gap height={6} />
    </>
  )
}

export default Logo
