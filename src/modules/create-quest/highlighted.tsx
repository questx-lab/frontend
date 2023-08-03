import { FC } from 'react'

import tw from 'twin.macro'

import NewQuestStore from '@/store/local/new-quest'
import Toggle from '@/widgets/input/toggle'
import { HorizontalCenter } from '@/widgets/orientation'
import { SmallText } from '@/widgets/text'

const GapHorizontal = tw(HorizontalCenter)`gap-2`

const Highlighted: FC = () => {
  // data
  const highlighted = NewQuestStore.useStoreState((state) => state.highlighted)

  // action
  const setHighlighted = NewQuestStore.useStoreActions((action) => action.setHighlighted)

  return (
    <GapHorizontal>
      <Toggle checked={highlighted} onClicked={(value) => setHighlighted(value)} />
      <SmallText>Quest will be highlighted in your community.</SmallText>
    </GapHorizontal>
  )
}

export default Highlighted
