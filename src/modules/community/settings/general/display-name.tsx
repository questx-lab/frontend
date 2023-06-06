import { FC } from 'react'

import NewCommunityStore from '@/store/local/new-community'
import { TextField } from '@/widgets/form'
import { Horizontal } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { HeaderText3, RequiredText } from '@/widgets/text'

const DisplayName: FC = () => {
  const dislayName = NewCommunityStore.useStoreState((state) => state.displayName)
  const setDisplayName = NewCommunityStore.useStoreActions((action) => action.setDisplayName)

  return (
    <>
      <Horizontal>
        <HeaderText3>NAME</HeaderText3>
        <Gap width={1} />
        <RequiredText>{'*'}</RequiredText>
      </Horizontal>
      <Gap height={2} />
      <TextField value={dislayName} onChange={(e) => setDisplayName(e.target.valeu)}></TextField>
      <Gap height={6} />
    </>
  )
}

export default DisplayName
