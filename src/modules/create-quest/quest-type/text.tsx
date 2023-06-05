import { FunctionComponent } from 'react'

import tw from 'twin.macro'

import { OuterBox } from '@/modules/create-quest/quest-type/mini-widget'
import NewQuestStore from '@/store/local/new-quest.store'
import { TextField } from '@/widgets/form'
import { CheckBox } from '@/widgets/input'
import { HorizontalCenter } from '@/widgets/orientation'
import { Gap } from '@/widgets/separator'
import { Label, SmallText } from '@/widgets/text'

const LabelCheckText = tw.span`
  cursor-pointer
  select-none
  text-sm
  font-medium
  text-black
`

export const QuestTypeText: FunctionComponent = () => {
  // data
  const anwser = NewQuestStore.useStoreState((state) => state.anwser)
  const textAutoValid = NewQuestStore.useStoreState((state) => state.textAutoValid)

  // action
  const setTextAutoValidation = NewQuestStore.useStoreActions(
    (actions) => actions.setTextAutoValidation
  )
  const setAnswer = NewQuestStore.useStoreActions((actions) => actions.setAnswer)

  return (
    <OuterBox>
      <HorizontalCenter>
        <CheckBox
          checked={textAutoValid}
          onChange={(e) => {
            setTextAutoValidation(e.target.checked)
          }}
          id='inline-checked-checkbox'
          type='checkbox'
        />

        <LabelCheckText onClick={() => setTextAutoValidation(!textAutoValid)}>
          {'Autovalidate'}
        </LabelCheckText>
      </HorizontalCenter>
      {textAutoValid && (
        <>
          <Gap height={4} />
          <Label>{'Correct Answer'}</Label>
          <Gap height={2} />
          <TextField
            onChange={(e) => setAnswer(e.target.value)}
            placeholder=''
            value={anwser}
            required
            msg='This field is required'
          />
          <Gap height={2} />
          <SmallText>{'Leave empty for accepting any value'}</SmallText>
        </>
      )}
    </OuterBox>
  )
}
