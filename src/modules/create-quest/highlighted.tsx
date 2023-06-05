import { FunctionComponent } from 'react'

import NewQuestStore from '@/store/local/new-quest'
import Toggle from '@/widgets/input/toggle'
import { HorizontalCenter } from '@/widgets/orientation'
import { SmallText } from '@/widgets/text'

const Highlighted: FunctionComponent = () => {
  // data
  const highlighted = NewQuestStore.useStoreState((state) => state.highlighted)

  // action
  const setHighlighted = NewQuestStore.useStoreActions((action) => action.setHighlighted)

  return (
    <HorizontalCenter>
      <Toggle checked={highlighted} onClicked={(value) => setHighlighted(value)} />
      <SmallText>Quest will be highlighted in your community.</SmallText>
    </HorizontalCenter>
  )
}

export default Highlighted
