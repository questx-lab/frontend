import { ChangeEvent, FunctionComponent, useEffect } from 'react'

import toast from 'react-hot-toast'
import { FixedSizeList as List } from 'react-window'

import { updateClaimedQuestApi } from '@/app/api/client/quest'
import {
  ClaimedQuestStatus,
  ReviewBtnEnum,
  TabReviewEnum,
} from '@/constants/project.const'
import { NewQuestStore } from '@/store/local/new-quest.store'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
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
import { ClaimQuestType } from '@/types/project.type'
import { BarsArrowDownIcon } from '@heroicons/react/24/solid'

import QuestSearch from './quest-search'
import { getListClaimQuest } from './review-submission'
import SubmissionItem from './submission-item'

const RenderBtn: FunctionComponent<{ data: ClaimQuestType[] }> = ({ data }) => {
  // action
  const onListClaimQuestPendingChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onListClaimQuestPendingChanged
  )
  const onLoadingModalChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  if (!data.length) {
    return <></>
  }

  // Handler
  const updateClaimQuest = async (submissionType: number) => {
    try {
      let action = ClaimedQuestStatus.ACCEPTED
      if (submissionType === ReviewBtnEnum.REJECT) {
        action = ClaimedQuestStatus.REJECTED
      }

      const rs = await updateClaimedQuestApi(
        data.map((e) => e.id!),
        action
      )

      if (rs.error) {
        toast.error(rs.error)
      } else {
        onListClaimQuestPendingChanged([])
      }

      setTimeout(() => onLoadingModalChanged(false), 500)
    } catch (error) {
      toast.error('Error network')
      onLoadingModalChanged(false)
    }
  }
  const onSubmit = (submitType: number) => {
    updateClaimQuest(submitType)
    onLoadingModalChanged(true)
  }

  return (
    <BtnWrap>
      <BtnBox>
        <Btn
          onClick={() => onSubmit(ReviewBtnEnum.REJECT)}
          btnType={ReviewBtnEnum.REJECT}
        >
          {'Reject'}
        </Btn>
        <Btn
          onClick={() => onSubmit(ReviewBtnEnum.ACCEPT)}
          btnType={ReviewBtnEnum.ACCEPT}
        >
          {'Accept'}
        </Btn>
      </BtnBox>
    </BtnWrap>
  )
}

const PendingTab: FunctionComponent<{ projectId: string }> = ({
  projectId,
}) => {
  // Data
  const chooseQuestsState = NewQuestStore.useStoreState(
    (state) => state.chooseQuestsPending
  )
  const allCheckPendingState = NewQuestStore.useStoreState(
    (state) => state.allCheckPending
  )
  const listClaimQuestState = NewQuestStore.useStoreState(
    (state) => state.listClaimPendingQuest
  )
  const questsSelect = NewQuestSearchStore.useStoreState(
    (state) => state.questsSelect
  )

  // Actions
  const onChooseQuestsChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onChooseQuestsPendingChanged
  )
  const onAllCheckPendingChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onAllCheckPendingChanged
  )
  const onListClaimQuestPendingChanged = NewQuestStore.useStoreActions(
    (actions) => actions.onListClaimQuestPendingChanged
  )

  // Hook
  useEffect(() => {
    getListClaimQuest(
      projectId,
      'pending',
      onListClaimQuestPendingChanged,
      questsSelect.map((e) => e.id!)
    )
  }, [])

  const onCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    onAllCheckPendingChanged(e.target.checked)
    if (e.target.checked) {
      onChooseQuestsChanged(listClaimQuestState.map((e) => e))
    } else {
      onChooseQuestsChanged([])
    }
  }

  const onCheck = (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => {
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
              itemCount={listClaimQuestState.length}
              itemSize={120}
              width={'100%'}
            >
              {({ index, style }) => {
                const active = chooseQuestsState.includes(
                  listClaimQuestState[index]
                )
                return (
                  <SubmissionItem
                    tab={TabReviewEnum.PENDING}
                    active={active}
                    onChange={onCheck}
                    payload={listClaimQuestState[index]}
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
            {/* <Recurrence /> */}
            <QuestSearch projectId={projectId} />
          </PRWrap>
        </PRSide>
      </PBox>
      <RenderBtn data={chooseQuestsState} />
    </PWrap>
  )
}

export default PendingTab
