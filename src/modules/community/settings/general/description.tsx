import { FC } from 'react'

import NewCommunityStore from '@/store/local/new-community.store'
import { TextField } from '@/widgets/form'
import { Gap } from '@/widgets/separator'
import { HeaderText3 } from '@/widgets/text'

const Description: FC = () => {
  const introduction = NewCommunityStore.useStoreState((state) => state.introduction)
  const setIntroduction = NewCommunityStore.useStoreActions((action) => action.setIntroduction)

  return (
    <>
      <HeaderText3>DESCRIPTION</HeaderText3>
      <Gap height={2} />
      <TextField
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        placeholder='Short introduction about your community.'
      ></TextField>
      <Gap height={6} />
    </>
  )
}

export default Description
