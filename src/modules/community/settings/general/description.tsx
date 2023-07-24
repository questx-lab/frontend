import { FC } from 'react'

import tw from 'twin.macro'

import NewCommunityStore from '@/store/local/new-community'
import { TextField } from '@/widgets/form'
import { VerticalFullWidth } from '@/widgets/orientation'
import { HeaderText3 } from '@/widgets/text'

const GapVertical = tw(VerticalFullWidth)`gap-2`

const Description: FC = () => {
  const introduction = NewCommunityStore.useStoreState((state) => state.introduction)
  const setIntroduction = NewCommunityStore.useStoreActions((action) => action.setIntroduction)

  return (
    <GapVertical>
      <HeaderText3>DESCRIPTION</HeaderText3>
      <TextField
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        placeholder='Short introduction about your community.'
      />
    </GapVertical>
  )
}

export default Description
