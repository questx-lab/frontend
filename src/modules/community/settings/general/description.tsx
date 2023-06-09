import { FC } from 'react'

import NewCommunityStore from '@/store/local/new-community'
import { TextField } from '@/widgets/form'
import { HeaderText3 } from '@/widgets/text'

const Description: FC = () => {
  const introduction = NewCommunityStore.useStoreState((state) => state.introduction)
  const setIntroduction = NewCommunityStore.useStoreActions((action) => action.setIntroduction)

  return (
    <>
      <HeaderText3>DESCRIPTION</HeaderText3>
      <TextField
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        placeholder='Short introduction about your community.'
      />
    </>
  )
}

export default Description
