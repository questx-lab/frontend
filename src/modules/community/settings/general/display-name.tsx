import { FC } from 'react'

import tw from 'twin.macro'

import NewCommunityStore from '@/store/local/new-community'
import { TextField } from '@/widgets/form'
import { Horizontal, VerticalFullWidth } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { HeaderText3, RequiredText } from '@/widgets/text'

const GapVertical = tw(VerticalFullWidth)`gap-2`

const DisplayName: FC = () => {
  const dislayName = NewCommunityStore.useStoreState((state) => state.displayName)
  const setDisplayName = NewCommunityStore.useStoreActions((action) => action.setDisplayName)

  return (
    <GapVertical>
      <Horizontal>
        <HeaderText3>NAME</HeaderText3>
        <Gap width={1} />
        <RequiredText>{'*'}</RequiredText>
      </Horizontal>
      <TextField value={dislayName} onChange={(e) => setDisplayName(e.target.value)} />
    </GapVertical>
  )
}

export default DisplayName
