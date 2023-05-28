import { OuterBox } from '@/modules/create-quest/quest-type/mini-widget'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { Divider } from '@/styles/common.style'
import { TextField } from '@/widgets/form'
import { Label } from '@/widgets/text'
import { FunctionComponent } from 'react'

export const VisitLink: FunctionComponent = () => {
  const visitLink = NewQuestStore.useStoreState((state) => state.visitLink)
  const setVisitLink = NewQuestStore.useStoreActions((actions) => actions.setVisitLink)

  return (
    <>
      <Divider />
      <OuterBox>
        <Label>{'LINK'}</Label>
        <TextField
          onChange={(e) => setVisitLink(e.target.value)}
          placeholder='https://example.com'
          value={visitLink}
          required
          errorMsg='You must have a url to visit link submission.'
        />
      </OuterBox>
    </>
  )
}
