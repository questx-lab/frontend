import { FC } from 'react'

import { StorageConst } from '@/constants/storage.const'
import NewCommunityStore from '@/store/local/new-community.store'
import { Gap } from '@/styles/common.style'
import { GrayBorderBox } from '@/widgets/box'
import { Image } from '@/widgets/image'
import { HeaderText3, PrimaryText } from '@/widgets/text'

const Logo: FC = () => {
  const logoUrl = NewCommunityStore.useStoreState((state) => state.logoUrl)

  return (
    <>
      <HeaderText3>PROJECT IMAGE</HeaderText3>
      <Gap height={2} />
      <GrayBorderBox>
        <Image
          width={250}
          height={250}
          src={logoUrl || StorageConst.COMMUNITY_DEFAULT.src}
          alt={'avatar'}
        />
      </GrayBorderBox>

      <Gap height={2} />
      <PrimaryText size='sm'>{'*Max 5.0MB, Size 200x200px'}</PrimaryText>
      <Gap height={6} />
    </>
  )
}

export default Logo
