import { ChangeEvent, FunctionComponent, useEffect } from 'react'

import toast from 'react-hot-toast'
import { FixedSizeList as List } from 'react-window'

import { updateClaimedQuestApi } from '@/app/api/client/quest'
import {
  ClaimedQuestStatus,
  ReviewBtnEnum,
  TabReviewEnum,
} from '@/constants/project.const'
import { NewQuestClaimStore } from '@/store/local/quest-claim.store'
import { NewQuestSearchStore } from '@/store/local/quest-search.store'
import {
  Btn,
  BtnBox,
  BtnWrap,
  NothingBox,
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
  const onPendingClaimsChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onPendingClaimsChanged
  )
  const onLoadingModalChanged = NewQuestClaimStore.useStoreActions(
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
        onPendingClaimsChanged([])
      }

      setTimeout(() => onLoadingModalChanged(false), 200)
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

const RenderBody: FunctionComponent<{
  data: ClaimQuestType[]
  choose: ClaimQuestType[]
  onCheck: (e: ChangeEvent<HTMLInputElement>, value: ClaimQuestType) => void
}> = ({ data, choose, onCheck }) => {
  if (data.length === 0) {
    return <NothingBox>{'Nothing quest claim'}</NothingBox>
  }

  return (
    <List height={600} itemCount={data.length} itemSize={120} width={'100%'}>
      {({ index, style }) => {
        const active = choose.includes(data[index])
        return (
          <SubmissionItem
            tab={TabReviewEnum.PENDING}
            active={active}
            onChange={onCheck}
            payload={data[index]}
            key={index}
            style={style}
          />
        )
      }}
    </List>
  )
}

const PendingTab: FunctionComponent<{ projectId: string }> = ({
  projectId,
}) => {
  // Data
  const chooseQuestsState = NewQuestClaimStore.useStoreState(
    (state) => state.chooseQuestsPending
  )
  const allCheckPendingState = NewQuestClaimStore.useStoreState(
    (state) => state.allCheckPending
  )
  const listClaimQuestState = NewQuestClaimStore.useStoreState(
    (state) => state.pendingClaims
  )
  const questsSelect = NewQuestSearchStore.useStoreState(
    (state) => state.questsSelect
  )

  // Actions
  const onChooseQuestsChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onChooseQuestsPendingChanged
  )
  const onAllCheckPendingChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onAllCheckPendingChanged
  )
  const onPendingClaimsChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onPendingClaimsChanged
  )
  const onLoadingModalChanged = NewQuestClaimStore.useStoreActions(
    (actions) => actions.onLoadingModalChanged
  )

  // Hook
  useEffect(() => {
    getClaimsQuest()
  }, [])

  const getClaimsQuest = async () => {
    onLoadingModalChanged(true)
    await getListClaimQuest(
      projectId,
      'pending',
      onPendingClaimsChanged,
      questsSelect.map((e) => e.id!)
    )
    setTimeout(() => onLoadingModalChanged(false), 200)
  }

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
            <RenderBody
              onCheck={onCheck}
              data={listClaimQuestState}
              choose={chooseQuestsState}
            />
            {/* <List
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
            </List> */}
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
