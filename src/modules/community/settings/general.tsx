import { FC } from 'react'

import tw from 'twin.macro'

import { StorageConst } from '@/constants/storage.const'
import NewCommunityStore from '@/store/local/new-community.store'
import { Gap } from '@/styles/common.style'
import { TextField } from '@/widgets/form'
import { Image } from '@/widgets/image'
import { Horizontal, VerticalFullWidth } from '@/widgets/orientation'
import { HeaderText3, PrimaryText, RequiredText } from '@/widgets/text'

const VerticalFrame = tw(VerticalFullWidth)`
  w-2/3
  max-2xl:px-12
  max-lg:px-6
`

const General: FC = () => {
  const dislayName = NewCommunityStore.useStoreState((state) => state.displayName)

  return (
    <VerticalFrame>
      <Horizontal>
        <HeaderText3>NAME</HeaderText3>
        <Gap width={1} />
        <RequiredText>{'*'}</RequiredText>
      </Horizontal>
      <Gap height={2} />
      <TextField value={dislayName} onChange={(e) => {}} placeholder=''></TextField>
      <Gap height={6} />

      <HeaderText3>DESCRIPTION</HeaderText3>
      <Gap height={2} />
      <TextField value={'AAAA'} onChange={(e) => {}} placeholder=''></TextField>
      <Gap height={6} />

      <HeaderText3>PROJECT IMAGE</HeaderText3>
      <Gap height={2} />
      <Image width={250} height={250} src={StorageConst.COMMUNITY_DEFAULT.src} alt={'avatar'} />
      <Gap height={2} />
      <PrimaryText size='sm'>{'*Max 5.0MB, Size 200x200px'}</PrimaryText>
      <Gap height={6} />

      <HeaderText3>WEBSITE URL</HeaderText3>
    </VerticalFrame>
  )
}

export default General
