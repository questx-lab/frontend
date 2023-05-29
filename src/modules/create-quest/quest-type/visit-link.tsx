import { SubtypeBox } from '@/modules/create-quest/quest-type/mini-widget'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { TextField } from '@/widgets/form'
import { FunctionComponent } from 'react'

export const VisitLink: FunctionComponent = () => {
  const visitLink = NewQuestStore.useStoreState((state) => state.visitLink)
  const setVisitLink = NewQuestStore.useStoreActions((actions) => actions.setVisitLink)

  return (
    <SubtypeBox title='LINK'>
      <TextField
        onChange={(e) => setVisitLink(e.target.value)}
        placeholder='https://example.com'
        value={visitLink}
        required
        msg='You must have a url to visit link submission.'
      />
    </SubtypeBox>
  )
}
