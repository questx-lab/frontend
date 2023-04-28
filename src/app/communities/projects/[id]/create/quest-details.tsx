'use client'

import { Gap } from '@/styles/common.style'
import { LabelCheckText, PICard } from '@/styles/questboard.style'
import { QuestTypeEnum } from '@/constants/project.const'
import { TBox, TCheckBox } from '@/styles/quest.style'

import { NewQuestStore } from './store'

const QuestDetails = () => {
  // Data
  const questType = NewQuestStore.useStoreState((state) => state.questType)
  const textAutoValid = NewQuestStore.useStoreState(
    (state) => state.textAutoValid
  )

  // Actions
  const onTextAutoValid = NewQuestStore.useStoreActions(
    (actions) => actions.onTextAutoValid
  )

  switch (questType) {
    case QuestTypeEnum.URL:
      return <></>
    case QuestTypeEnum.TEXT:
      return (
        <PICard>
          <Gap height={6} />
          <TBox>
            <TCheckBox
              checked={textAutoValid}
              onChange={(e) => {
                onTextAutoValid(e.target.checked)
              }}
              id='inline-checked-checkbox'
              type='checkbox'
            />
            <Gap width={4} />
            <LabelCheckText>{'Autovalidate'}</LabelCheckText>
          </TBox>
          {/* {textAutoValid && (
            <>
              <Gap height={4} />
              <LabelInput>{'Correct Answer'}</LabelInput>
              <Gap height={2} />
              <InputBox ref={textAnserRef} placeholder='' />
              <Gap height={2} />
              <LabelDes>{'Leave empty for accepting any value'}</LabelDes>
            </>
          )} */}
        </PICard>
      )
  }
  return <></>
}

export default QuestDetails
