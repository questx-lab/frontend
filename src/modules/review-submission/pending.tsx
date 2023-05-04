import { ChangeEvent, FunctionComponent } from 'react'

import { FixedSizeList as List } from 'react-window'

import { ReviewBtnEnum, TabReviewEnum } from '@/constants/project.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import {
  Btn,
  BtnBox,
  BtnWrap,
  PBody,
  PBox,
  PCheckBox,
  PHeaderInfo,
  PLSide,
  PRSide,
  PRWrap,
  PSort,
  PTabHeader,
  PWrap,
} from '@/styles/quest-review.style'
import { BarsArrowDownIcon } from '@heroicons/react/24/solid'

import QuestSearch from './quest-search'
import Recurrence from './recurrence'
import SubmissionItem from './submission-item'

const DummyData = Array.from({ length: 1000 }, (_, i) => i)

const RenderBtn: FunctionComponent<{ data: string[] }> = ({ data }) => {
  if (!data.length) {
    return <></>
  }

  return (
    <BtnWrap>
      <BtnBox>
        <Btn btnType={ReviewBtnEnum.REJECT}>{'Reject'}</Btn>
        <Btn btnType={ReviewBtnEnum.ACCEPT}>{'Accept'}</Btn>
      </BtnBox>
    </BtnWrap>
  )
}

const PendingTab: FunctionComponent = () => {
  // Data
  const chooseQuestsState = NewQuestStore.useStoreState(
    (state) => state.chooseQuestsPending
  )
  const allCheckPendingState = NewQuestStore.useStoreState(
    (state) => state.allCheckPending
  )

  // Actions
  const onChooseQuestsChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onChooseQuestsPendingChanged
  )
  const onAllCheckPendingChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onAllCheckPendingChanged
  )

  // Handler
  const onCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    onAllCheckPendingChanged(e.target.checked)
    if (e.target.checked) {
      onChooseQuestsChanged(DummyData.map((e) => e.toString()))
    } else {
      onChooseQuestsChanged([])
    }
  }

  const onCheck = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    if (e.target.checked) {
      onChooseQuestsChanged([...chooseQuestsState, value])
    } else {
      onChooseQuestsChanged(chooseQuestsState.filter((data) => data !== value))
    }
  }

  return (
    <PWrap>
      <PBox>
        <PLSide>
          <PTabHeader>
            <PHeaderInfo>
              <PCheckBox
                id='inline-checked-checkbox'
                type='checkbox'
                onChange={onCheckAll}
                checked={allCheckPendingState}
              />
              {'Pending Submission'}
            </PHeaderInfo>
            <PSort>
              <BarsArrowDownIcon className='w-4 h-4 mr-1' />
              {'Sort by'}
            </PSort>
          </PTabHeader>

          <PBody>
            <List
              height={600}
              itemCount={DummyData.length}
              itemSize={120}
              width={'100%'}
            >
              {({ index, style }) => {
                const active = chooseQuestsState.includes(index.toString())
                return (
                  <SubmissionItem
                    submissionType={TabReviewEnum.PENDING}
                    active={active}
                    onChange={onCheck}
                    payload={index.toString()}
                    key={index}
                    style={style}
                  />
                )
              }}
            </List>
          </PBody>
        </PLSide>
        <PRSide>
          <PRWrap>
            <PTabHeader>
              <PHeaderInfo>{'Filter'}</PHeaderInfo>
            </PTabHeader>
            <Recurrence />
            <QuestSearch />
          </PRWrap>
        </PRSide>
      </PBox>
      <RenderBtn data={chooseQuestsState} />
    </PWrap>
  )
}

export default PendingTab
